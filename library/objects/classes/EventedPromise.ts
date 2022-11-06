import { DestroyerFn } from '../types.ts';
import { Event } from './Event.ts';

let i = 0;

/**
 * A custom awaiter, meaning an object that behaves like a promise (it can be awaited) but is driven
 * by events, that are in turn probably powered by the game loop.
 *
 * Call eventedPromise.resolve() to resolve, or eventedPromise.reject() to cancel.
 *
 * Finishing or interrupting the promise will clean up listeners and resolve/reject the promise.
 *
 * @remarks
 * On the one hand that makes it easier to wait for existing start/finish pairs -- for example:
 *
 *   // Await that an entity finishes an entire path, or reject when another path is started instead
 *   const { promise } = new EventedPromise(this.#$pathEnd, this.#$pathStart);
 *
 * Or it makes a promise more easily cancellable from outside the callback scope:
 *
 *   const { $finish, $interrupt, promise } = new EventedPromise();
 *   $someOtherEvent.on(() => $interrupt.emit());
 *   setTimeout(() => $finish.emit(), 1000);
 */
export class EventedPromise {
	#$finish: Event<unknown[]>;
	public isResolved = false;

	#$interrupt: Event<unknown[]>;
	public isRejected = false;

	/**
	 * @deprecated Not a useful property, should remove at some point.
	 */
	id: number;

	public constructor($finish?: Event<unknown[]>, $interrupt?: Event<unknown[]>) {
		this.id = ++i;
		// console.log(`${this.id} create`);
		this.#$finish = $finish || new Event(`${this.constructor.name} $finish`);
		this.#$interrupt = $interrupt || new Event(`${this.constructor.name} $interrupt`);

		const stopListeningForFinish = this.#$finish.once(() => {
			stopListeningForInterrupt();
			if (this.isResolved || this.isRejected) {
				// Programmer error:
				throw new Error(`EventedPromise #${this.id} can only close once, unexpected finish`);
			}
			this.isResolved = true;
			// console.log(`${this.id} async resolve from constructor`);
		});
		const stopListeningForInterrupt = this.#$interrupt.once(() => {
			stopListeningForFinish();
			if (this.isResolved || this.isRejected) {
				// Programmer error:
				throw new Error('EventedPromise can only close once, unexpected interrupt');
			}
			this.isRejected = true;
			// console.log(`${this.id} async reject from constructor`);
		});
	}

	public get isBusy() {
		return !this.isRejected && !this.isResolved;
	}

	public resolve() {
		this.#$finish.emit();
	}

	public reject() {
		this.#$interrupt.emit();
	}

	// As a convenience `onRejected` could default to whatever `onFulfilled` is. However, this would
	// be cumbersome to detect usages for in case I want to refactor that again later -- so prefer
	// letting the consumer be more verbose for now.
	public then(onFulfilled: () => void, onRejected?: () => void): EventedPromise {
		if (this.isResolved) {
			// console.log(`${this.id} resolve`);
			onFulfilled();
		} else if (this.isRejected) {
			// console.log(`${this.id} reject`);
			onRejected?.();
		} else {
			const stopListeningForFinish = this.#$finish.once(() => {
				stopListeningForInterrupt();
				// console.log(`${this.id} async resolve`);
				onFulfilled();
			});
			const stopListeningForInterrupt = this.#$interrupt.once(() => {
				stopListeningForFinish();
				// console.log(`${this.id} async reject`);
				onRejected?.();
			});
		}
		return this;
	}

	public static resolve(): EventedPromise {
		const promise = new EventedPromise();
		promise.resolve();
		return promise;
	}

	public static reject(): EventedPromise {
		const promise = new EventedPromise();
		promise.reject();
		return promise;
	}
}