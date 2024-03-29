import { personArchetype } from '@lib';
import { beforeAll, describe, expect, generateEmptyGame, it, mock, run } from '@test';

import { createLoiterBehavior } from './reusable/nodes/createLoiterBehavior.ts';

describe('BT: createLoiterBehavior()', async () => {
	const game = generateEmptyGame(),
		entity = personArchetype.create({
			location: game.terrain.getTileClosestToXy(3, 3).toArray(),
			behavior: createLoiterBehavior(),
			icon: '🤖',
			name: 'Loiterbot',
		});

	const pathStart = mock.fn(),
		pathEnd = mock.fn();
	entity.$pathStart.on(pathStart);
	entity.$pathEnd.on(pathEnd);

	beforeAll(async () => {
		await game.entities.add(entity);
	});

	it('t=500.000', async () => {
		await game.time.steps(500_000);
		expect(game.time.now).toBe(500_000);
		expect(pathStart).toHaveBeenCalled();
		expect(pathEnd).toHaveBeenCalled();
	});
});

run();
