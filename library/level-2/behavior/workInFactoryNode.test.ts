import { beforeAll, describe, expect, it, mock, run } from 'tincan';
import {
	TestDriver,
	FactoryBuildingEntity,
	PersonEntity,
	Game,
	generateGridTerrainFromAscii,
	SelectorNode,
} from '@lib/core';

import { createLoiterBehavior } from './reusable/nodes/createLoiterBehavior.ts';
import { beeKeeping } from '../blueprints.ts';
import { honey } from '../materials.ts';
import { workInFactory } from './workInFactoryNode.ts';
import { headOfState } from '../heroes.ts';
import { DEFAULT_ASSETS } from '../DEFAULT_ASSETS.ts';

describe('BT: workInFactory', async () => {
	const game = new Game(
			'1',
			generateGridTerrainFromAscii(`
				XXXXXXXXXXXXXXXXXXXXX
				XXXXXXXXXXXXXXXXXXXXX
				XXXXXXXXXXXXXXXXXXXXX
				XXXXXXXXXXXXXXXXXXXXX
				XXXXXXXXXXXXXXXXXXXXX
				XXXXXXXXXXXXXXXXXXXXX
				XXXXXXXXXXXXXXXXXXXXX
				XXXXXXXXXXXXXXXXXXXXX
				XXXXXXXXXXXXXXXXXXXXX
			`),
			DEFAULT_ASSETS,
		),
		entity = new PersonEntity('person-1', game.terrain.getTileClosestToXy(3, 3).toArray(), {
			gender: 'm',
			firstName: 'test',
		}),
		factory = new FactoryBuildingEntity(
			'factory',
			game.terrain.getTileClosestToXy(5, 5).toArray(),
			headOfState,
			{
				blueprint: beeKeeping,
				maxWorkers: 1,
				maxStackSpace: 8,
			},
		);

	const pathStart = mock.fn(),
		pathEnd = mock.fn();
	entity.$pathStart.on(pathStart);
	entity.$pathEnd.on(pathEnd);

	beforeAll(async () => {
		await new TestDriver().attach(game);
		await game.entities.add(entity, factory);

		// Wrap workInFactory in a selector node together with createLoiterBehavior(), so that we will not end up
		// in a max-call-stack-exceeded scenario when there is no available factory.
		await entity.$behavior.set(new SelectorNode(workInFactory, createLoiterBehavior()));
	});

	it('t=5.000 Walked to factory', async () => {
		await game.time.steps(5_000);
		expect(game.time.now).toBe(5_000);
		expect(pathStart).toHaveBeenCalledTimes(1);
		expect(pathEnd).toHaveBeenCalledTimes(1);
		expect(entity.$$location.get().equals(factory.$$location.get())).toBeTruthy();
		expect(factory.inventory.availableOf(honey)).toBe(0);
		expect(factory.$$progress.get()).toBeGreaterThan(0);
	});

	it('t=15.000 Finished first production cycle', async () => {
		await game.time.steps(10_000);
		expect(game.time.now).toBe(15_000);
		expect(pathStart).toHaveBeenCalledTimes(2);
		expect(pathEnd).toHaveBeenCalledTimes(1);
		expect(factory.inventory.availableOf(honey)).toBe(2);
	});

	it('t=23.000 Finished second production cycle', async () => {
		await game.time.steps(8_000);
		expect(game.time.now).toBe(23_000);
		expect(pathStart).toHaveBeenCalledTimes(3);
		expect(pathEnd).toHaveBeenCalledTimes(2);
		expect(factory.inventory.availableOf(honey)).toBe(2);
	});
	it('t=31.000 Finished third production cycle', async () => {
		await game.time.steps(8_000);
		expect(game.time.now).toBe(31_000);
		expect(pathStart).toHaveBeenCalledTimes(3);
		expect(pathEnd).toHaveBeenCalledTimes(3);
		expect(factory.inventory.availableOf(honey)).toBe(2);
	});
});

run();
