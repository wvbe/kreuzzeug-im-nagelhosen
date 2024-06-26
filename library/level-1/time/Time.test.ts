import { expect, mock } from '@test';
import { Time } from './Time.ts';

function noop() {
	/* no-op */
}
Deno.test('Time', async (test) => {
	await test.step('.steps()', async () => {
		const time = new Time();
		expect(time.now).toBe(0);
		await time.steps(3);
		expect(time.now).toBe(3);
	});

	await test.step('.setTimeout()', async (test) => {
		await test.step('happy flow', async () => {
			const time = new Time();
			const fn = mock.fn();

			time.setTimeout(fn, 10);
			expect(fn).toHaveBeenCalledTimes(0);
			expect(time.getNextEventAbsoluteTime()).toBe(10);

			await time.steps(10);
			expect(fn).toHaveBeenCalledTimes(1);
			expect(time.getNextEventAbsoluteTime()).toBe(Infinity);
		});
		await test.step('overlapping timeouts', async () => {
			const time = new Time();
			const fn1 = mock.fn();
			const fn2 = mock.fn();
			time.setTimeout(fn1, 3);
			time.setTimeout(fn2, 3);
			await time.steps(3);
			expect(fn1).toHaveBeenCalledTimes(1);
			expect(fn2).toHaveBeenCalledTimes(1);
		});
		await test.step('cancelling', async () => {
			const fn = mock.fn();
			const time = new Time();

			const destroy = time.setTimeout(fn, 10);
			expect(fn).toHaveBeenCalledTimes(0);
			expect(time.getNextEventAbsoluteTime()).toBe(10);

			await time.steps(5);
			destroy();
			expect(time.getNextEventAbsoluteTime()).toBe(Infinity);

			await time.steps(10);
			expect(fn).toHaveBeenCalledTimes(0);
		});
		await test.step('cancelling + overlapping timeouts', async () => {
			const time = new Time();
			const fn1 = mock.fn();
			const fn2 = mock.fn();
			time.setTimeout(fn1, 3);
			const destroy = time.setTimeout(fn2, 3);
			destroy();
			await time.steps(3);
			expect(fn1).toHaveBeenCalledTimes(1);
			expect(fn2).toHaveBeenCalledTimes(0);
		});
	});

	await test.step('.jump()', async () => {
		const time = new Time();
		time.setTimeout(noop, 10);
		await time.jump();
		expect(time.now).toBe(10);
	});

	await test.step('.getNextEventAbsoluteTime()', async () => {
		const time = new Time();
		expect(time.getNextEventAbsoluteTime()).toBe(Infinity);
		time.setTimeout(noop, 10);
		expect(time.getNextEventAbsoluteTime()).toBe(10);
		await time.jump();
		time.setTimeout(noop, 10);
		expect(time.getNextEventAbsoluteTime()).toBe(20);
		await time.jump();
		expect(time.getNextEventAbsoluteTime()).toBe(Infinity);
	});
});
