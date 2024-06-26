import Game from '../../Game.ts';
import { JobPosting } from '../../classes/JobPosting.ts';
import { DestroyerFn } from '../../types.ts';
import { assertEcsComponents, byEcsComponents, hasEcsComponents } from '../assert.ts';
import { EcsSystem } from '../classes/EcsSystem.ts';
import { eventLogComponent } from '../components/eventLogComponent.ts';
import { healthComponent } from '../components/healthComponent.ts';
import { importExportComponent } from '../components/importExportComponent.ts';
import { inventoryComponent } from '../components/inventoryComponent.ts';
import { locationComponent } from '../components/locationComponent.ts';
import { pathingComponent } from '../components/pathingComponent.ts';
import { LogisticsExchangeByMaterial } from './logisticsSystem/LogisticsExchangeByMaterial.ts';
import { LogisticsDeal, LogisticsEntity } from './logisticsSystem/types.ts';

/**
 * Creates inventory reservations for the supplier and destination inventories, so that a transport
 * agreement can be fulfilled.
 *
 *
 */
function createInventoryReservations(transportJobId: string, deal: LogisticsDeal) {
	// As soon as the job is created (not taken), the supplier and destination inventories are reserved
	// for their parts of the deal.
	deal.supplier.inventory.makeReservation(transportJobId, [
		{
			material: deal.material,
			quantity: -deal.quantity,
		},
	]);

	deal.destination.inventory.makeReservation(transportJobId, [
		{
			material: deal.material,
			quantity: deal.quantity,
		},
	]);
}
/**
 * Creates a job that represents a transport job. Same as production jobs, transport jobs can be
 * attractive to certain persons, or not.
 */
function createTransportJob(game: Game, transportJobId: string, deal: LogisticsDeal) {
	const assignJobToEntity: ConstructorParameters<typeof JobPosting>[0] = async (job, entity) => {
		assertEcsComponents(
			entity,
			[healthComponent, pathingComponent, locationComponent, inventoryComponent],
			[eventLogComponent],
		);
		if (entity.health.get() <= 0) {
			throw new Error('Dead people cannot haul cargo');
		}
		// Jobs are designed to have vacancies, that are taken and restored when the job finishes.
		// For transport jobs however, its not useful to open up a vacancy again when the transport
		// is done. Therefore, remove the job altogether.
		game.jobs.removeGlobal(job);

		await entity.events?.add(`Going to ${deal.supplier} for a hauling job`);

		const supplier = game.terrain.getTileEqualToLocation(deal.supplier.location.get());
		if (!supplier) {
			throw new Error(`Deal destination lives on a detached coordinate`);
		}
		await entity.walkToTile(game, supplier);
		if (entity.health.get() <= 0) {
			// Worker died to retrieve the cargo. There is now an inventory reservation that will never be fulfilled.
			// @TODO release inventory reservations
			return;
		}

		await entity.events?.add(
			`Loading ${deal.quantity} of ${deal.material} from ${deal.supplier} for transport to ${deal.destination}`,
		);
		await deal.supplier.events?.add(
			`Giving ${deal.quantity} of ${deal.material} to ${entity} for transport to ${deal.destination}`,
		);

		deal.supplier.inventory.clearReservation(transportJobId);
		await deal.supplier.inventory.change(deal.material, -deal.quantity);
		await game.time.wait(1_000 * (deal.quantity / deal.material.stack));
		// Skip emitting this event, because (due to the reservation made) nothing in the available
		// materials changes.
		// - This avoids a bug where the entity might snack on a material bfore it is reserved
		// - This introduces a bug where the UI might not updat
		// @TODO
		await entity.inventory.change(deal.material, deal.quantity, true);
		entity.inventory.makeReservation('transport-job', [
			// Make an outgoing reservation for the cargo
			// It would be a shame is somebody... ate the cargo
			{ material: deal.material, quantity: -deal.quantity },
		]);

		await entity.events?.add(`Delivering cargo to ${deal.destination}`);

		const destination = game.terrain.getTileEqualToLocation(deal.destination.location.get());
		if (!destination) {
			throw new Error(`Deal destination lives on a detached coordinate`);
		}
		await entity.walkToTile(game, destination);

		if (entity.health.get() <= 0) {
			// Worker died on the way to deliver the cargo.
			// @TODO Retrieve the cargo from their cold dead hands and deliver it?
			return;
		}

		await entity.events?.add(`Unloading cargo to ${deal.destination}`);
		deal.destination.events?.add(
			`Received ${deal.quantity} of ${deal.material} from ${deal.supplier} transported by ${entity}`,
		);
		entity.inventory.clearReservation('transport-job');
		// Skip emitting this event, because (due to the reservation made) nothing in the available
		// materials changes.
		// - This avoids a bug where the entity might snack on a material bfore it is reserved
		// - This introduces a bug where the UI might not updat
		// @TODO
		await entity.inventory.change(deal.material, -deal.quantity, true);
		await game.time.wait(1_000 * (deal.quantity / deal.material.stack));
		deal.destination.inventory.clearReservation(transportJobId);
		await deal.destination.inventory.change(deal.material, deal.quantity);
	};

	const scoreJobDesirability: ConstructorParameters<typeof JobPosting>[1]['score'] = (entity) => {
		if (
			!hasEcsComponents(entity, [
				healthComponent,
				pathingComponent,
				locationComponent,
				inventoryComponent,
			])
		) {
			return 0;
		}
		if (entity.health.get() <= 0) {
			// Dead people cannot haul cargo
			return 0;
		}
		if (!entity.inventory.isAdditionallyAllocatableTo(deal.material, deal.quantity)) {
			// If not enough inventory space, never take the job
			return 0;
		}

		let desirability = 1;
		const maximumDistanceWillingToTravel = 20,
			distanceToJob = entity.euclideanDistanceTo(deal.supplier.location.get()),
			// 1 = very close job, 0 = infinitely far
			distanceMultiplier = Math.max(
				0,
				(maximumDistanceWillingToTravel - distanceToJob) / maximumDistanceWillingToTravel,
			);

		desirability *= distanceMultiplier;

		// Give a small boost so that, all other things being equal, a transport job is preferred over
		// a production job
		desirability *= 1.1;

		return desirability;
	};

	return new JobPosting(assignJobToEntity, {
		vacancies: 1,
		label: `Transport ${deal.material} for ${deal.destination}`,
		score: scoreJobDesirability,
		restoreVacancyWhenDone: false,
	});
}

async function attachSystemToEntity(
	game: Game,
	exchange: LogisticsExchangeByMaterial,
	trader: LogisticsEntity,
) {
	const updateExchangeForInventoryContents = async () => {
		for (const { material, quantity } of trader.provideMaterialsWhenAbove) {
			const availableOf = trader.inventory.availableOf(material);
			if (availableOf > quantity) {
				const provideQuantity = availableOf - quantity;
				exchange.get(material).updateSupplyDemand(trader, provideQuantity);
			}
		}
		for (const { material, quantity } of trader.requestMaterialsWhenBelow) {
			const availableOf = trader.inventory.availableOf(material);
			if (availableOf < quantity) {
				// Never ask for more than what we can stow
				const requestQuantity = Math.min(
					quantity - availableOf,
					trader.inventory.amountAdditionallyAllocatableTo(material),
				);
				exchange.get(material).updateSupplyDemand(trader, -requestQuantity);
			}
		}
	};

	trader.inventory.$change.on(updateExchangeForInventoryContents);
	updateExchangeForInventoryContents();
}

const JOB_POST_INTERVAL = 10_000;
async function attachSystem(game: Game) {
	const exchange = new LogisticsExchangeByMaterial();

	let identifier = 0;
	let lastUpdateTime = 0;
	let timeoutId: DestroyerFn<number> | null = null;

	/**
	 * Finds a deal to be made in any of the {@link LogisticExchange}s, and oosts a job for it on
	 * the global jobboard so that a capable entity can pick it up.
	 *
	 * This function is called in a timeout (triggered from an inventory change somewhere) instead
	 * of an interval, because an interval would prevent the game from ever ending.
	 */
	function postTransportJobs(game: Game) {
		if (timeoutId !== null) {
			// A timer is already set
			return;
		}
		const timeLeft = JOB_POST_INTERVAL - (lastUpdateTime % JOB_POST_INTERVAL);

		timeoutId = game.time.setTimeout(() => {
			lastUpdateTime = game.time.now;
			timeoutId = null;
			exchange.forEach((materialExchange) => {
				let deal: LogisticsDeal | null = null;
				while ((deal = materialExchange.getLargestTransferDeal())) {
					// @TODO update an existing transport job, if it exists and while carry capacity can
					const transportJobId = `transport-job-${identifier++}`;
					materialExchange.excludeDealFromRecords(deal);
					createInventoryReservations(transportJobId, deal);
					const job = createTransportJob(game, transportJobId, deal);
					game.jobs.addGlobal(job);
				}
			});
		}, Math.max(timeLeft, 1));
	}

	game.entities.$add.on(async (entities) => {
		await Promise.all(
			entities
				.filter(byEcsComponents([importExportComponent, inventoryComponent, locationComponent]))
				.map((trader) => {
					trader.inventory.$change.on(async () => {
						postTransportJobs(game);
					});
					postTransportJobs(game);

					return attachSystemToEntity(game, exchange, trader);
				}),
		);
	});
}

export const logisticsSystem = new EcsSystem(attachSystem);
