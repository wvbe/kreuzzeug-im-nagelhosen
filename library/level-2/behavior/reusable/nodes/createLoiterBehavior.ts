import {
	Random,
	ExecutionNode,
	SelectorNode,
	SequenceNode,
	EntityBlackboard,
	BehaviorTreeSignal,
} from '@lib/core';
import { createWaitBehavior } from './createWaitBehavior.ts';
import { needsComponent } from '@lib/core';
import { rejectBehaviorTreeWhenMissingEcsComponent } from '@lib/core';
import { statusComponent } from '@lib/core';
import { locationComponent } from '@lib/core';
import { pathingComponent } from '@lib/core';
import { healthComponent } from '@lib/core';

// Some "entropy" lolz0r
let ticker = 0;

export function createLoiterBehavior() {
	return new SelectorNode<EntityBlackboard>(
		new SequenceNode(
			new ExecutionNode('Wander', async ({ game, entity }) => {
				rejectBehaviorTreeWhenMissingEcsComponent(entity, [
					statusComponent,
					locationComponent,
					pathingComponent,
					healthComponent,
				]);

				if (entity.$health.get() <= 0) {
					throw new BehaviorTreeSignal(`Dead people cannot wander`);
				}

				// if ((entity.needs.energy.get() || 0) < 0.2) {
				// 	throw new BehaviorTreeSignal(`${entity} is too tired to wander around`);
				// }
				await entity.$status.push('Wandering around…');
				const start = game.terrain.getTileEqualToLocation(entity.$$location.get());

				const closestTiles = game.terrain.selectClosestTiles(start, 5);
				if (!closestTiles.length) {
					throw new BehaviorTreeSignal(`Theres nowhere to wander to for ${entity}`);
				}
				const destination = Random.fromArray(closestTiles, entity.id, 'loiter walk', ++ticker);
				await entity.walkToTile(destination);
			}),
			createWaitBehavior(1000, 3000),
		),
		createWaitBehavior(1000, 3000, null),
	);
}
