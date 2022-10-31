import { Event } from '../classes/Event.ts';
import { EventedPromise } from '../classes/EventedPromise.ts';
import { EventedValue } from '../classes/EventedValue.ts';
import Logger from '../classes/Logger.ts';
import { Path } from '../classes/Path.ts';
import { Random } from '../classes/Random.ts';
import { FIRST_NAMES_F, FIRST_NAMES_M } from '../constants/names.tsx';
import { PERSON_NEEDS } from '../constants/needs.ts';
import { Inventory } from '../inventory/Inventory.ts';
import { type CallbackFn, type CoordinateI, type TileI } from '../types.ts';
import { Entity } from './entity.ts';
import { Need } from './Need.ts';

export class PersonEntity extends Entity {
	// The amount of game coordinate per millisecond
	private readonly walkSpeed = 1 / 1000;

	public readonly $pathStart = new Event<[]>(`${this.constructor.name} $pathStart`);

	/**
	 * Event: The event that the person finishes every step of a path.
	 *
	 * @TODO maybe invent a more generic "idle" event.
	 */
	public readonly $pathEnd = new Event<[]>(`${this.constructor.name} $pathEnd`);

	/**
	 * Event: The person started one step.
	 */
	public readonly $stepStart = new Event<
		[
			/**
			 * The destination of this step
			 */
			CoordinateI,
			/**
			 * The expected duration of time it takes to perform this step
			 */
			number,
			/**
			 * The "done" callback. Call this when the driver animation/timeout ends, so that
			 * the next event is safely emitted.
			 */
			CallbackFn,
		]
	>(`${this.constructor.name} $stepStart`);

	/**
	 * Event: The person started finished one step. The entities location is updated upon this event.
	 *
	 * Do not emit this event. Instead, call the "done()" argument of the $stepStart event. For
	 * example:
	 *
	 *   entity.$stepStart.on((destination, duration, done) => {
	 *      // Entity starts stepping towards ${destination}
	 *      game.time.setTimeout(done, duration);
	 *   });
	 */
	public readonly $stepEnd = new Event<[CoordinateI]>(`${this.constructor.name} $stepEnd`);

	public readonly userData: {
		gender: 'm' | 'f';
		firstName: string;
	};

	/**
	 * The stuff this person carries around. As it happens that also makes them the (temporary)
	 * owner of it.
	 */
	public readonly inventory = new Inventory(6);

	/**
	 * The amount of money this person posesses.
	 */
	public readonly wallet = new EventedValue<number>(0, `${this.constructor.name} wallet`);

	public readonly needs = PERSON_NEEDS.map(
		(config) => new Need(config.id, 1, config.label, config.decay),
	);

	/**
	 * @deprecated not used yet.
	 */
	public type = 'person';

	constructor(id: string, location: CoordinateI) {
		super(id, location);

		const gender = Random.boolean([id, this.constructor.name, 'gender']);
		const firstName = Random.fromArray(
			gender ? FIRST_NAMES_M : FIRST_NAMES_F,
			id,
			this.constructor.name,
			'firstName',
		);
		this.userData = {
			gender: gender ? 'm' : 'f',
			firstName,
		};

		// Movement handling
		this.$stepEnd.on((loc) => {
			this.$$location.set(loc);
		});

		// Set randomized initial need values
		this.needs.forEach((need) => need.set(Random.normal(this.id, 'need', need.id), true));

		// Register need into game event loop
		this.$attach.on((game) => {
			this.needs.forEach((need) => {
				need.attach(game);
				this.$detach.once(() => need.detach());
			});

			// @TODO necessary?
			// this.$detach.once(() => this.needs.forEach((need) => need.clear()));
		});
	}

	public get name(): string {
		return this.userData.firstName;
	}
	public get icon(): string {
		return this.userData.gender === 'm' ? '👨' : '👩';
	}

	public get title() {
		return 'Sitting around…';
	}

	/**
	 * Make the entity choose a path from its current location to the destination, and start an
	 * animation.
	 *
	 * Returns a promise that resolves when the path is completed, or rejects when another path
	 * interrupts our current before the destination was reached.
	 */
	public walkToTile(destination: TileI): EventedPromise {
		const terrain = destination.terrain;
		if (!terrain) {
			throw new Error(`Entity "${this.id}" is trying to path in a detached coordinate`);
		}

		// Its _possible_ that an entity lives on a tile that has so much elevation that
		// .getTileClosestToXy actually finds the _wrong_ tile -- because its neighbor is closer than
		// the proximity to z=0. In that case, there is a bug:
		//
		// const start = terrain.getTileClosestToXy(this.$$location.get().x, this.$$location.get().y);
		//
		// To work around the bug, and as a cheaper option, find the tile whose XY is equal to the current
		// location. The only downsize is that entities that are mid-way a tile will not find one. Since
		// this is not a feature yet, we can use it regardless:
		const start = terrain.getTileEqualToLocation(this.$$location.get());
		const path = new Path(terrain, { closest: true }).findPathBetween(start, destination);

		return this.walkAlongPath(path);
	}

	/**
	 * Start the animation of walking a path. Return a promise that resolves when finished, or rejects
	 * when interrupted.
	 *
	 * Very similar to .walkToTile, but more appropriate if the path is already computed.
	 */
	public walkAlongPath(path: TileI[]): EventedPromise {
		// @TODO add some safety checks on the path maybe.

		// Emitting this event may prompt the promises of other walkOnTile tasks to reject.
		this.$pathStart.emit();

		if (!path.length) {
			this.$pathEnd.emit();
			return EventedPromise.resolve();
		}

		const unlisten = this.$stepEnd.on(() => {
			const nextStep = path.shift();
			if (!nextStep) {
				unlisten();
				this.$pathEnd.emit();
			} else {
				this.animateTo(nextStep);
			}
		});

		const promise = new EventedPromise(this.$pathEnd, this.$pathStart);
		const next = path.shift();
		if (next) {
			this.animateTo(next);
		}
		return promise;
	}

	/**
	 * Move entity directly to a coordinate. Does not consider accessibility or closeness.
	 */
	private animateTo(coordinate: CoordinateI) {
		if (coordinate.hasNaN()) {
			// @TODO remove at some point?
			throw new Error('This should never happen I suppose');
		}
		const distance = this.$$location.get().euclideanDistanceTo(coordinate);

		const done = () => this.$stepEnd.emit(coordinate);
		this.$stepStart.emit(coordinate, distance / this.walkSpeed, done);
	}
}
