import { DEFAULT_ASSETS, DriverI, Game } from '@lib';

import { generateGridTerrainFromAscii } from './generateGridTerrainFromAscii.ts';
import { TestDriver } from '../level-1/drivers/TestDriver.ts';

const defaultEmptyGameMap = `
	XXXXX
	XXXXX
	XXXXX
	XXXXX
	XXXXX
`;

/**
 * @deprecated Only here as a test convenience.
 */
export function generateEmptyGame(ascii: string = defaultEmptyGameMap) {
	return new Game(new TestDriver(), '1', generateGridTerrainFromAscii(ascii), DEFAULT_ASSETS);
}
