import { describe, expect, it, run, generateEmptyGame } from '@test';
import { FactoryBuildingEntity, PersonEntity } from '@lib';
import { growWheat } from '../../level-2/blueprints.ts';
import { beforeAll } from 'tincan';
import { wheat } from '../../level-2/materials.ts';

Deno.test('System: blueprintProduction', async (test) => {
	const game = await generateEmptyGame();
	const worker = new PersonEntity('person-1', [0, 0, 1], {
		gender: 'm',
		firstName: 'test',
	});
	const factory = new FactoryBuildingEntity('factory', [3, 0, 1], worker, {
		blueprint: growWheat,
		maxStackSpace: 1,
		maxWorkers: 1,
	});
	await game.entities.add(worker);
	await game.entities.add(factory);
	void factory.assignJobToEntity({ game, entity: worker });

	await test.step('Opening scenario', async (test) => {
		await test.step('Time is zero', () => {
			expect(game.time.now).toBe(0);
		});
		await test.step('Person is in their starting position', () => {
			expect(worker.$$location.get().toArray()).toEqual([0, 0, 1]);
		});
		await test.step('Factory does not have workers', () => {
			expect(factory.$workers.length).toBe(0);
		});
	});

	await test.step('When the worker arrives', async (test) => {
		// This shoulda been done after t=3000
		await game.time.steps(3004);
		await test.step('Time is just over 3000', () => {
			expect(game.time.now).toBe(3004);
		});
		await test.step('Person is physically at the factory', () => {
			expect(worker.$$location.get().toArray()).toEqual(factory.$$location.get().toArray());
		});
		await test.step('Factory does have workers', () => {
			expect(factory.$workers.length).toBe(1);
		});
		await test.step('Factory not have progress, but is gonna make it', () => {
			expect(factory.$$progress.get()).toBe(0);
			expect(factory.$$progress.delta).toBe(1 / growWheat.options.fullTimeEquivalent);
		});
		await test.step('Factory has no produce yet', () => {
			expect(factory.inventory.availableOf(wheat)).toBe(0);
		});
	});

	await test.step('When the worker has been around for a bit', async (test) => {
		await game.time.steps(500);
		await test.step('Time is just over 3500', () => {
			expect(game.time.now).toBe(3504);
		});
		await test.step('Factory has made the expected amount of progress', () => {
			const delta = 1 / growWheat.options.fullTimeEquivalent;
			expect(factory.$$progress.delta).toBe(delta);
			expect(factory.$$progress.get()).toBe(500 * delta);
		});
		await test.step("Still hasn't produced yet", () => {
			expect(factory.inventory.availableOf(wheat)).toBe(0);
		});
	});

	await test.step('When the worker has been around long enough', async (test) => {
		await game.time.steps(16496);
		await test.step('Time is at 20000', () => {
			expect(game.time.now).toBe(20_000);
		});
		await test.step('Factory produced a thing', () => {
			expect(factory.inventory.availableOf(wheat)).toBe(1);
		});
		await test.step('Factory has stopped', () => {
			expect(factory.$workers.length).toBe(0);
			expect(factory.$$progress.delta).toBe(0);
			expect(factory.$$progress.get()).toBe(0);
		});
	});
});
