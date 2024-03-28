import Game from '../../Game.ts';
import { type Material } from '../../inventory/Material.ts';
import { needsComponent } from '../components/needsComponent.ts';
import { EcsSystem } from '../classes/EcsSystem.ts';
import { healthComponent } from '../components/healthComponent.ts';
import { inventoryComponent } from '../components/inventoryComponent.ts';
import { locationComponent } from '../components/locationComponent.ts';
import { pathingComponent } from '../components/pathingComponent.ts';
import { productionComponent } from '../components/productionComponent.ts';
import { Blueprint } from '../components/productionComponent/Blueprint.ts';
import { statusComponent } from '../components/statusComponent.ts';
import { vendorComponent } from '../components/vendorComponent.ts';
import { wealthComponent } from '../components/wealthComponent.ts';
import { EcsEntity } from '../types.ts';
import { Need } from '../../entities/Need.ts';
import { ownerComponent } from '../components/ownerComponent.ts';

type GroceryPurchasingEntity = EcsEntity<
	| typeof locationComponent
	| typeof pathingComponent
	| typeof inventoryComponent
	| typeof wealthComponent
	| typeof healthComponent
	| typeof needsComponent
>;

type GrocerySellingEntity = EcsEntity<
	| typeof locationComponent
	| typeof inventoryComponent
	| typeof vendorComponent
	| typeof ownerComponent
>;

type GroceryProposal = {
	vendor: GrocerySellingEntity;
	material: Material;
	score: number;
};

function isGrocerySellingEntity(entity: EcsEntity): entity is GrocerySellingEntity {
	return (
		locationComponent.test(entity) &&
		inventoryComponent.test(entity) &&
		vendorComponent.test(entity) &&
		ownerComponent.test(entity)
	);
}

type MaterialVendorScore = {
	material: Material;
	vendor: GrocerySellingEntity;
	score: number;
};

function scoreEntityVendorMaterialNeed(
	entity: GroceryPurchasingEntity,
	vendor: GrocerySellingEntity,
	material: Material,
	need: Need,
) {
	const costPerItem = material.value + vendor.profitMargin * material.value;
	if (entity.wallet.get() < costPerItem) {
		return 0;
	}
	if (entity.inventory.getAvailableItems().some(({ material }) => material[need.id] > 0)) {
		return 0;
	}

	let desirability = 1;

	desirability *= (material[need.id] || 0) / costPerItem;

	// The lower the need is already, the bigger the desirability
	desirability *= 1 / need.get();

	return desirability;
}
function scoreEntityVendor(entity: GroceryPurchasingEntity, vendor: GrocerySellingEntity) {
	let desirability = 1;

	const maximumDistanceWillingToTravel = 20,
		distanceToJob = vendor.$$location.get().euclideanDistanceTo(entity.$$location.get()),
		// 1 = very close job, 0 = infinitely far
		distanceMultiplier = Math.max(
			0,
			(maximumDistanceWillingToTravel - distanceToJob) / maximumDistanceWillingToTravel,
		);
	desirability *= distanceMultiplier;

	desirability /= vendor.profitMargin;

	return desirability;
}

/**
 * Returns the vendor/material combination that
 * - is reasonably close to the entity
 * - selling at least one of a material that would meet the given need
 * - preferring materials that give a lot of relief per cost, rather than a little
 * - and the vendor doesn't have as bad of a profit margin as the others.
 */
function getMostAttractiveVendorForNeed(
	entity: GroceryPurchasingEntity,
	game: Game,
	need: Need,
): GroceryProposal | null {
	return (
		game.entities
			.filter<GrocerySellingEntity>(isGrocerySellingEntity)
			.map((vendor) => ({
				vendor,
				score: scoreEntityVendor(entity, vendor),
			}))
			.reduce<{ vendor: GrocerySellingEntity; material: Material; score: number }[]>(
				(vendorMaterialScores, { vendor, score }) =>
					vendorMaterialScores.concat(
						vendor.inventory.getAvailableItems().map(({ material }) => {
							const costPerItem = material.value + vendor.profitMargin * material.value;
							return {
								vendor,
								material,
								score: score * scoreEntityVendorMaterialNeed(entity, vendor, material, need),
							};
						}),
					),
				[],
			)
			.sort((a, b) => b.score - a.score)[0] || null
	);
}

let identifier = 0;
async function doGrocery(
	game: Game,
	entity: GroceryPurchasingEntity,
	need: Need,
	{ vendor, material }: GroceryProposal,
) {
	if (entity.$health.get() <= 0) {
		throw new Error('Dead people cannot haul cargo');
	}

	const costPerItem = material.value + vendor.profitMargin * material.value;

	const reservationId = `groceries-${identifier++}`;
	const purchaseQuantity = Math.min(
		material.stack,
		entity.inventory.amountAdditionallyAllocatableTo(material),
		vendor.inventory.availableOf(material),
		Math.floor(entity.wallet.get() / costPerItem),
		(1 / material[need.id]) * 2,
	);
	if (purchaseQuantity < 1) {
		throw new Error('This shoulda been impossible');
	}
	entity.inventory.makeReservation(reservationId, [{ material, quantity: purchaseQuantity }]);
	vendor.inventory.makeReservation(reservationId, [{ material, quantity: -purchaseQuantity }]);

	// await entity.$status.push(`Going to ${deal.vendor} to get some supplies

	await entity.walkToTile(game.terrain.getTileEqualToLocation(vendor.$$location.get()));
	if (entity.$health.get() <= 0) {
		// Worker died to retrieve the cargo. There is now an inventory reservation that will never be fulfilled.
		// @TODO release inventory reservations
		return;
	}

	// Money changes hands first, and instantly
	entity.wallet.set(entity.wallet.get() - purchaseQuantity * costPerItem);
	vendor.owner.wallet.set(vendor.owner.wallet.get() + purchaseQuantity * costPerItem);

	vendor.inventory.clearReservation(reservationId);
	vendor.inventory.change(material, -purchaseQuantity);
	await game.time.wait(1_000 * (purchaseQuantity / material.stack));
	entity.inventory.clearReservation(reservationId);
	entity.inventory.change(material, purchaseQuantity);
}

async function attachSystemToEntity(game: Game, entity: GroceryPurchasingEntity) {
	const queue: (() => {
		execute: () => Promise<void>;
		score: number;
	})[] = [];

	Object.values(entity.needs).forEach((need) => {
		need.onBelow(0.5, () => {
			const task = () => {
				const deal = getMostAttractiveVendorForNeed(entity, game, need);

				if (!deal) {
					return { execute: () => Promise.resolve(/* void */), score: 0 };
				}
				return { execute: () => doGrocery(game, entity, need, deal), score: deal.score };
			};
			game.jobs.addPersonal(entity, task);

			need.onceAbove(0.5, () => game.jobs.removePersonal(entity, task), true);
		});
	});
}

async function attachSystem(game: Game) {
	game.entities.$add.on(async (entities) => {
		await Promise.all(
			entities
				.filter(
					(entity): entity is GroceryPurchasingEntity =>
						healthComponent.test(entity) &&
						inventoryComponent.test(entity) &&
						locationComponent.test(entity) &&
						needsComponent.test(entity) &&
						pathingComponent.test(entity) &&
						statusComponent.test(entity),
				)
				.map((person) => attachSystemToEntity(game, person)),
		);
	});
}

/**
 * The production system lets factories or other entities with production-related components produce
 * {@link Material}s. A {@link Blueprint} is used as the recipe for this production process.
 *
 * Blueprint ingredients and products are all exchanged within the inventory belonging to the factory
 * entity.
 *
 * The production speed is determined by the amount of worker entities at the factory -- the
 * production speed is linear to the number of workers, unless there are too little workers to
 * satisfy the requirement of a blueprint, in which case the production speed is penalized by 70%.
 *
 * When a production cycle is complete and there is still enough ingredients as well as avaialble space
 * in the inventory, and workers present, a new production cycle starts automatically.
 */
export const grocerySystem = new EcsSystem(
	[
		productionComponent,
		statusComponent,
		locationComponent,
		inventoryComponent,
		pathingComponent,
		healthComponent,
	],
	attachSystem,
);
