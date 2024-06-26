import {
	EcsEntity,
	MaterialState,
	importExportComponent,
	inventoryComponent,
	locationComponent,
	personArchetype,
	visibilityComponent,
} from '@lib/core';
import { expect, generateEmptyGame } from '@test';
import { createJobWorkBehavior } from '../../../level-2/behavior/reusable/nodes/createJobWorkBehavior.ts';
import { wheat } from '../../../level-2/materials.ts';
import { SimpleCoordinate } from '../../terrain/types.ts';
import { eventLogComponent } from '@lib';

function createChestEntity(
	location: SimpleCoordinate,
	requestMaterialsWhenBelow: MaterialState[],
	provideMaterialsWhenAbove: MaterialState[],
) {
	const entity = { id: 'chest-' + location.join('/') };
	inventoryComponent.attach(entity, { maxStackSpace: Infinity });
	locationComponent.attach(entity, { location });
	importExportComponent.attach(entity, {
		provideMaterialsWhenAbove,
		requestMaterialsWhenBelow,
	});
	visibilityComponent.attach(entity, { icon: '📦', name: entity.id });
	return entity as EcsEntity<
		typeof inventoryComponent | typeof locationComponent | typeof importExportComponent
	>;
}

function getLastEventLog(entity: EcsEntity<typeof eventLogComponent>) {
	return entity.events.slice(-1)[0];
}

Deno.test('System: logisticsSystem', async (test) => {
	const game = await generateEmptyGame();
	const worker = personArchetype.create({
		location: [0, 0, 1],
		icon: '🤖',
		name: 'R-bot',
		behavior: createJobWorkBehavior(),
	});
	await game.entities.add(worker);

	const providerChest = createChestEntity([2, 2, 1], [], [{ material: wheat, quantity: 100 }]);
	await game.entities.add(providerChest);

	const requesterChest = createChestEntity([2, 0, 1], [{ material: wheat, quantity: 1000 }], []);
	await game.entities.add(requesterChest);

	await providerChest.inventory.change(wheat, 1000);

	// Useful to debug the timestamps for various actions:
	// getLastEventLog(worker)status) => console.log(`Updated status at t=${game.time.now}: ${status}`));

	await test.step('Opening scenario', async (test) => {
		await test.step('Time is zero', () => {
			expect(game.time.now).toBe(0);
		});
		await test.step('Person is in their starting position', () => {
			expect(worker.location.get()).toEqual([0, 0, 1]);
		});
		await test.step('There is a job posting', () => {
			expect(game.jobs.globalJobCount).toBe(0);
		});
		await test.step('Checking all the inventory numbers', () => {
			expect(providerChest.inventory.availableOf(wheat)).toBe(1000);
			expect(providerChest.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(providerChest.inventory.reservedOutgoingOf(wheat)).toBe(0);

			expect(requesterChest.inventory.availableOf(wheat)).toBe(0);
			expect(requesterChest.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(requesterChest.inventory.reservedOutgoingOf(wheat)).toBe(0);

			expect(worker.inventory.availableOf(wheat)).toBe(0);
			expect(worker.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(worker.inventory.reservedOutgoingOf(wheat)).toBe(0);
		});
	});

	await test.step('When the timeout before a transport job is posted has not expired', async (test) => {
		await game.time.steps(9_000);
		expect(game.time.now).toBe(9_000);
		await test.step('Person is still in their starting position', () => {
			expect(worker.location.get()).toEqual([0, 0, 1]);
		});
		await test.step('There is a job posting', () => {
			expect(game.jobs.globalJobCount).toBe(0);
		});
	});

	await test.step('As soon as the transport job is posted, the worker takes it', async (test) => {
		await game.time.steps(1_000);
		expect(game.time.now).toBe(10_000);
		await test.step('Person is still in their starting position', () => {
			expect(worker.location.get()).toEqual([0, 0, 1]);
		});
		await test.step('Worker has a status update', () => {
			expect(getLastEventLog(worker)).toBe('Going to #{entity:chest-2/2/1} for a hauling job');
		});

		await test.step('Checking all the inventory numbers', () => {
			expect(providerChest.inventory.availableOf(wheat)).toBe(100);
			expect(providerChest.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(providerChest.inventory.reservedOutgoingOf(wheat)).toBe(900);

			expect(requesterChest.inventory.availableOf(wheat)).toBe(0);
			expect(requesterChest.inventory.reservedIncomingOf(wheat)).toBe(900);
			expect(requesterChest.inventory.reservedOutgoingOf(wheat)).toBe(0);

			expect(worker.inventory.availableOf(wheat)).toBe(0);
			expect(worker.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(worker.inventory.reservedOutgoingOf(wheat)).toBe(0);
		});

		await test.step('There are 8 remaining job postings', () => {
			// One job to transport another 100 wheat
			expect(game.jobs.globalJobCount).toBe(8);
		});
	});

	await test.step('When the worker arrives at the pick-up location', async (test) => {
		await game.time.steps(4_001);
		expect(game.time.now).toBe(14_001);
		expect(worker.inventory.reservedOutgoingOf(wheat)).toBe(0);
		await test.step('Person location is same as provider chest', () => {
			expect(worker.location.get()).toEqual(providerChest.location.get());
		});
		await test.step('Checking all the inventory numbers', () => {
			expect(providerChest.inventory.availableOf(wheat)).toBe(100);
			expect(providerChest.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(providerChest.inventory.reservedOutgoingOf(wheat)).toBe(800);

			expect(requesterChest.inventory.availableOf(wheat)).toBe(0);
			expect(requesterChest.inventory.reservedIncomingOf(wheat)).toBe(900);
			expect(requesterChest.inventory.reservedOutgoingOf(wheat)).toBe(0);

			expect(worker.inventory.availableOf(wheat)).toBe(0);
			expect(worker.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(worker.inventory.reservedOutgoingOf(wheat)).toBe(0);
		});
		await test.step('Worker has a status update', () => {
			expect(getLastEventLog(worker)).toBe(
				'Loading 100 of WH Wheat from #{entity:chest-2/2/1} for transport to #{entity:chest-2/0/1}',
			);
		});
	});

	await test.step('When the worker leaves the pick-up location', async (test) => {
		await game.time.steps(1_001);
		expect(game.time.now).toBe(15_002);
		await test.step('Worker has a status update', () => {
			expect(getLastEventLog(worker)).toBe('Delivering cargo to #{entity:chest-2/0/1}');
		});
		await test.step('Checking all the inventory numbers', () => {
			expect(worker.inventory.availableOf(wheat)).toBe(0);
			expect(worker.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(worker.inventory.reservedOutgoingOf(wheat)).toBe(100);
		});
	});

	await test.step('When the worker arrives at the drop-off location', async (test) => {
		await game.time.steps(2_000);
		expect(game.time.now).toBe(17_002);
		await test.step('Worker has a status update', () => {
			expect(getLastEventLog(worker)).toBe('Unloading cargo to #{entity:chest-2/0/1}');
		});
		await test.step('Worker no longer hanging on to the cargo', () => {
			expect(worker.inventory.reservedOutgoingOf(wheat)).toBe(0);
		});
		await test.step('Checking all the inventory numbers', () => {
			expect(providerChest.inventory.availableOf(wheat)).toBe(100);
			expect(providerChest.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(providerChest.inventory.reservedOutgoingOf(wheat)).toBe(800);

			expect(requesterChest.inventory.availableOf(wheat)).toBe(0);
			expect(requesterChest.inventory.reservedIncomingOf(wheat)).toBe(900);
			expect(requesterChest.inventory.reservedOutgoingOf(wheat)).toBe(0);

			expect(worker.inventory.availableOf(wheat)).toBe(0);
			expect(worker.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(worker.inventory.reservedOutgoingOf(wheat)).toBe(0);
		});
	});

	await test.step('When the cargo transfer is complete', async (test) => {
		await game.time.steps(1_002);
		expect(game.time.now).toBe(18_004);
		await test.step('Requester has received all', () => {
			expect(worker.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(requesterChest.inventory.availableOf(wheat)).toBe(100);
		});

		await test.step('Checking all the inventory numbers', () => {
			expect(providerChest.inventory.availableOf(wheat)).toBe(100);
			expect(providerChest.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(providerChest.inventory.reservedOutgoingOf(wheat)).toBe(800);

			expect(requesterChest.inventory.availableOf(wheat)).toBe(100);
			expect(requesterChest.inventory.reservedIncomingOf(wheat)).toBe(800);
			expect(requesterChest.inventory.reservedOutgoingOf(wheat)).toBe(0);

			expect(worker.inventory.availableOf(wheat)).toBe(0);
			expect(worker.inventory.reservedIncomingOf(wheat)).toBe(0);
			expect(worker.inventory.reservedOutgoingOf(wheat)).toBe(0);
		});
	});

	// TODO actually finish test yooo
});
