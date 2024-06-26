import { TestDriver, expect } from '@test';

import createBasementDemo from './basement.ts';

import { personArchetype, type EcsArchetypeEntity } from '@lib';

Deno.test('"The basement"', async (test) => {
	const driver = new TestDriver(),
		game = await createBasementDemo(driver),
		melanie = game.entities.find((entity) => personArchetype.test(entity)) as EcsArchetypeEntity<
			typeof personArchetype
		>;

	await test.step('Melanie is called Melanie, and she has needs', () => {
		expect(melanie.name).toBe('Ro-bot');
		Object.values(melanie.needs).forEach((need) => {
			expect(need.get()).toBeGreaterThan(0);
		});
	});

	await test.step('The game finishes by itself', async () => {
		expect(await driver.startUntilStop()).toBeUndefined();
		expect(game.time.hasNextEvent()).toBeFalsy();
		expect(game.time.now).toBeGreaterThan(116000);

		expect(game.time.getNextEventAbsoluteTime()).toBe(Infinity);
	});

	await test.step('Melanie is dead', () => {
		expect(melanie.health.get()).toBe(0);
	});
});
