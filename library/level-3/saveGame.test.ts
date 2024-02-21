import { describe, expect, it, run, beforeAll } from 'tincan';

import { TestDriver, Game } from '../level-1/mod.ts';
import createGeneratorDemo from './generator.ts';
import { DEFAULT_ASSETS } from '@lib';

describe('Loading the initial game', async () => {
	let game_original: Game, game_loaded: Game;
	beforeAll(async () => {
		game_original = (await createGeneratorDemo(new TestDriver())).game;
		game_loaded = await Game.fromSaveJson(DEFAULT_ASSETS, game_original.toSaveJson());
	});

	it('Has the same amount of entities', () => {
		expect(game_loaded.entities.length).toBe(game_original.entities.length);
	});

	it('Every entity is the same', () => {
		game_original.entities.forEach((entity, i) => {
			expect(game_loaded.entities.get(i)).toEqual(entity);
		});
	});
});

run();