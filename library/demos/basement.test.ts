import { describe, run, expect, it } from 'https://deno.land/x/tincan@1.0.1/mod.ts';

import createBasementDemo from './basement.ts';
import { TestDriver } from '@lib';

describe('"The basement"', () => {
	it('The game finishes by itself', async () => {
		const { driver } = createBasementDemo(new TestDriver());
		expect(await driver.start()).toBeUndefined();
	});
});

run();
