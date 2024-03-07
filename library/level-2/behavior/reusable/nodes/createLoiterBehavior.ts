import {
	Random,
	ExecutionNode,
	SelectorNode,
	SequenceNode,
	EntityBlackboard,
	BehaviorTreeSignal,
} from '@lib/core';
import { createWaitBehavior } from './createWaitBehavior.ts';

// Some "entropy" lolz0r
let ticker = 0;

export function createLoiterBehavior() {
	return new SelectorNode<EntityBlackboard>(
		new SequenceNode(
			new ExecutionNode('Wander', async ({ game, entity }) => {
				if ((entity.needs.find((need) => need.id === 'energy')?.get() || 0) < 0.2) {
					console.log(`Too tired, ${entity}`);
					throw new BehaviorTreeSignal(`${entity} is too tired to wander around`);
				}
				await entity.$status.set('Wandering around…');
				const start = game.terrain.getTileEqualToLocation(entity.$$location.get());

				const closestTiles = game.terrain.selectClosestTiles(start, 5);
				if (!closestTiles.length) {
					console.log(`Nowhere to go for ${entity}`);
					throw new BehaviorTreeSignal(`Theres nowhere to wander to for ${entity.label}`);
				}
				const destination = Random.fromArray(closestTiles, entity.id, 'loiter walk', ++ticker);
				await entity.walkToTile(destination);
			}),
			createWaitBehavior(1000, 3000),
		),
		createWaitBehavior(1000, 3000, null),
	);
}
