import { expect, it, describe, run } from 'https://deno.land/x/tincan@1.0.1/mod.ts';
import { RectangleParty } from './generateRectangles.ts';

it('generateRectangles', () => {
	const root = RectangleParty.init(['test'], 50, 50, {
		minimumBuildingLength: 20,
	});

	expect(root.debug()).toMatchInlineSnapshot(`
		"[0, 0, 50, 50]
		- [0, 0, 50, 32.4440510863205]
		- - [0, 0, 50, 17.83482779655932]
		- - [0, 17.83482779655932, 50, 14.60922328976118]
		- - - [0, 17.83482779655932, 31.19705432817692, 14.60922328976118]
		- - - [31.19705432817692, 17.83482779655932, 18.80294567182308, 14.60922328976118]
		- [0, 32.4440510863205, 50, 17.555948913679497]"
	`);

	expect(root.flatten().map((r) => r.label())).toMatchInlineSnapshot(`
		Array [
		  "[0, 0, 50, 17.83482779655932]",
		  "[0, 17.83482779655932, 31.19705432817692, 14.60922328976118]",
		  "[31.19705432817692, 17.83482779655932, 18.80294567182308, 14.60922328976118]",
		  "[0, 32.4440510863205, 50, 17.555948913679497]",
		]
	`);
});
run();