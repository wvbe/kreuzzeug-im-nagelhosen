import { CallbackFn, DestroyerFn } from '../types.ts';
import { SaveTimeJson } from '../types-savedgame.ts';
import { EventedValue } from './EventedValue.ts';
import { EventedPromise } from './EventedPromise.ts';

export class TimeLine extends EventedValue<number> {
	#timers = new Map<number, CallbackFn[]>();

	public constructor(initial: number = 0) {
		super(initial, 'TimeLine');
	}

	/**
	 * The current absolute time passed.
	 */
	get now(): number {
		return this.get();
	}

	/**
	 * Take one step. Runs all callbacks registers for that specific time, and then removes them.
	 *
	 * Note that this function sets .current and calls .emit(), same as the .set() method would do,
	 * albeit execute timers in between. This avoids the case where time is not updated yet and setTimeout
	 * of 1 frame thinks time progression is 0.
	 */
	public step(): void {
		const frame = this.now + 1;

		this.current = frame;
		const timers = this.#timers.get(frame);
		while (timers && timers.length > 0) {
			timers.shift()?.();
		}
		this.#timers.delete(frame);
		this.emit();
	}

	/**
	 * Take many steps in quick succession.
	 */
	public steps(much: number): void {
		let remaining = much;
		while (remaining-- > 0) {
			this.step();
		}
	}

	/**
	 * Wether or not there are events planned for the future.
	 */
	public hasNextEvent(): boolean {
		return this.#timers.size > 0;
	}

	/**
	 * Get the time at which the next scheduled event occurs
	 *
	 * @todo Make this cheap.
	 */
	public getNextEventAbsoluteTime(): number {
		return Array.from(this.#timers.keys()).reduce((min, k) => Math.min(min, k), Infinity);
	}

	/**
	 * Jump to a future time, skipping all steps in between, and _then_ step.
	 *
	 * By default it would skip to the next point in time with a registered timer, and trigger it.
	 */
	public jump(next = this.getNextEventAbsoluteTime()): void {
		if (!next || next === Infinity) {
			throw new Error(`There is no next event to jump to`);
		}
		this.set(next - 1, true);
		this.step();
	}

	/**
	 * Schedule a callback for a relative amount of time in the future.
	 *
	 * Returns the destroyer function with which the timeout can be cancelled. Calling the destroyer
	 * will return to you the amount of time that was left on the timeout.
	 */
	public setTimeout(callback: CallbackFn, delay: number): DestroyerFn<number> {
		if (delay === Infinity || delay <= 0) {
			throw new Error(`Timeout delay must be between 0 and Infinity, but was set to ${delay}.`);
		}
		const now = this.now;
		const frame = Math.ceil(now + delay);
		if (!this.#timers.has(frame)) {
			this.#timers.set(frame, [callback]);
		} else {
			this.#timers.get(frame)?.push(callback);
		}
		return () => {
			const timeLeft = frame - now;
			const timers = this.#timers.get(frame);
			if (!timers) {
				return timeLeft;
			}
			const filteredTimers = timers.filter((f) => f !== callback);
			if (filteredTimers.length) {
				this.#timers.set(frame, filteredTimers);
			} else {
				this.#timers.delete(frame);
			}
			return timeLeft;
		};
	}

	public wait(time: number): EventedPromise {
		const promise = new EventedPromise();
		this.setTimeout(() => {
			promise.resolve();
		}, time);
		return promise;
	}

	/**
	 * Serialize for a save game JSON
	 */
	public serializeToSaveJson(): SaveTimeJson {
		return {};
	}
}