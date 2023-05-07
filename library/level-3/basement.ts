/**
 * "The basement"
 *
 * Rectangular squarish space, and only a very few things lying around.
 *
 * The expected outcome is a short-running game that ends the timeloop amicably because there is
 * no further events planned.
 */
import {
	FactoryBuildingEntity,
	Game,
	generateGridTerrainFromAscii,
	PersonEntity,
} from '../level-1/mod.ts';
import { blueprints } from '../level-2/mod.ts';
import { Demo } from './types.ts';

const demo: Demo = (driver) => {
	const terrain = generateGridTerrainFromAscii(`
		XXXXXXXXXXXX
		XXXXXXXXXXXX
		XXXXXXXXXXXX
		XXXXXXXXXXXX
		XXXXXXXXXXXX
		XXXXXXXXXXXX
		XXXXXXXXXXXX
	`);

	const game = new Game('1', terrain);
	driver.attach(game);

	const entity = new PersonEntity('1', terrain.getTileClosestToXy(0, 0), {
		gender: 'm',
		firstName: 'Melanie',
	});
	game.entities.add(entity);

	const well = new FactoryBuildingEntity('2', terrain.getTileClosestToXy(3, 3), {
		maxWorkers: 0,
		maxStackSpace: 1,
	});
	game.entities.add(well);

	well.setBlueprint(blueprints.getWaterFromWell);

	return { driver, game };
};

export default demo;