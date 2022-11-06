import { type EventedPromise } from '../../classes/EventedPromise.ts';
import { type PersonEntity } from '../../entities/entity.person.ts';
import { type EntityI } from '../../entities/types.ts';
import type Game from '../../Game.ts';

export function walkEntityToEntity(
	game: Game,
	entity: PersonEntity,
	destination: EntityI,
): EventedPromise {
	const tile = game.terrain.getTileEqualToLocation(destination.$$location.get());
	return entity.walkToTile(tile);
}

export function getEntitiesReachableByEntity<F>(game: Game, entity: PersonEntity): EntityI[] {
	const location = game.terrain.getTileEqualToLocation(entity.$$location.get());
	const island = game.terrain.selectContiguousTiles(location);
	return game.entities.filter((e) => island.some((tile) => e.$$location.get().equals(tile)));
}