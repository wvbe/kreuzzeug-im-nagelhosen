import {
	Command,
	EcsEntity,
	EntityBlackboard,
	JobPosting,
	SurfaceType,
	assertEcsComponents,
	inventoryComponent,
	locationComponent,
	pathableComponent,
	pathingComponent,
	surfaceComponent,
} from '@lib/core';
import { hasEcsComponents } from '../../level-1/ecs/assert.ts';

type TileEntity = EcsEntity<
	typeof locationComponent | typeof surfaceComponent | typeof pathableComponent
>;

/**
 * A command that queues an unknown surface area for excavation by a worker. Excavating it will make
 * the surface walkable/pathable.
 */
export const clearSpace = new Command<EntityBlackboard>(
	'⛏️ Clear this space',
	({ entity }) =>
		// Only valid for tiles...
		hasEcsComponents(entity, [locationComponent, pathableComponent, surfaceComponent]) &&
		// ... that are not already cleared...
		entity.surfaceType.get() === SurfaceType.UNKNOWN &&
		// ... and are adjacent to a pathable neighbor
		entity.pathingNeighbours.some(
			(neighbour) =>
				(neighbour as EcsEntity<typeof surfaceComponent>).surfaceType?.get() === SurfaceType.OPEN,
		),
	({ game, entity: tile }) => {
		assertEcsComponents(tile, [locationComponent, pathableComponent, surfaceComponent]);

		// When the command is executed, create a job for a worker to do the rest:
		game.jobs.addGlobal(
			new JobPosting(
				async (job, worker) => {
					assertEcsComponents(worker, [pathingComponent, locationComponent, inventoryComponent]);
					await worker.walkToTile(game, tile);
					await game.time.wait(30_000);
					tile.walkability = 1;
					tile.surfaceType.set(SurfaceType.OPEN);
					game.jobs.removeGlobal(job);
				},
				{
					label: 'Clear a space',
					score: (worker) => {
						// @TODO keep in mind that the entity must be able to reach (a neighbor) of the tile
						if (
							!hasEcsComponents(worker, [pathingComponent, locationComponent, inventoryComponent])
						) {
							return 0;
						}
						if (!worker.inventory.availableOf(game.assets.materials.get('pickaxe')!)) {
							return 0;
						}
						return 1;
					},
					vacancies: 1,
					restoreVacancyWhenDone: false,
				},
			),
		);
	},
);
