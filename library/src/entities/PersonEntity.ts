import { Event } from '../classes/Event.ts';
import Logger from '../classes/Logger.ts';
import { Path } from '../classes/Path.ts';
import { Random } from '../classes/Random.ts';
import { FIRST_NAMES_F, FIRST_NAMES_M } from '../constants/names.tsx';
import { PersonNeedId, PersonNeedMap } from '../constants/needs.ts';
import type Game from '../Game.ts';
import { CallbackFn, CoordinateI, TileI } from '../types.ts';
import { Entity } from './Entity.ts';
import { Need } from './Need.ts';
import { type EntityPersonI } from './types.ts';

export class PersonEntity extends Entity implements EntityPersonI {
	// The amount of game coordinate per millisecond
	private readonly walkSpeed = 1 / 1000;

	// The event that the person finishes a path, according to react-spring's timing
	// @TODO maybe invent a more generic "idle" event.
	public readonly $pathEnd = new Event<[]>('PersonEntity $pathEnd');

	// The person started one step
	public readonly $stepStart = new Event<[CoordinateI, number, CallbackFn]>(
		'PersonEntity $stepStart',
	);

	// The person started finished one step, according to react-spring's timing
	public readonly $stepEnd = new Event<[CoordinateI]>('PersonEntity $stepEnd');

	public readonly userData: { gender: 'm' | 'f'; firstName: string };

	public readonly needs: PersonNeedMap = {
		food: new Need(1, 'Food', 1 / 150_000),
		water: new Need(1, 'Water', 1 / 100_000),
		sleep: new Need(1, 'Sleep', 1 / 130_000),
		hygiene: new Need(1, 'Clothing', 1 / 250_000),
		spirituality: new Need(1, 'Spirituality', 1 / 1_000_000),
	};

	public get needsList() {
		return ['food', 'water', 'sleep', 'hygiene', 'spirituality'].map(
			(key) => this.needs[key as PersonNeedId],
		);
	}

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
	}

	/**
	 * Attach this entity to the game loop.
	 *
	 * Will register to undo all of that when the entity detaches.
	 */
	public attach(game: Game): void {
		super.attach(game);

		Object.keys(this.needs).forEach((key) => {
			this.$destroy.once(this.needs[key as PersonNeedId].attach(game));
		});
	}

	public get label(): string {
		return `${this.icon} ${this.userData.firstName}`;
	}
	public get icon(): string {
		return this.userData.gender === 'm' ? '👨' : '👩';
	}

	public get title() {
		return this.job?.label || 'Sitting around…';
	}

	// Calculate a path and emit animations to walk it the whole way. `this.$$location` is updated in between each step
	public walkToTile(destination: TileI) {
		const terrain = destination.terrain;
		if (!terrain) {
			throw new Error(`Entity "${this.id}" is trying to path in a detached coordinate`);
		}
		const start = terrain.getTileClosestToXy(this.$$location.get().x, this.$$location.get().y);
		const path = new Path(terrain, { closest: true }).find(start, destination);

		if (!path.length) {
			Logger.warn('Path was zero steps long, finishing early.');
			// debugger;
			this.$pathEnd.emit();
			return;
		}
		const unlisten = this.$stepEnd.on(() => {
			const nextStep = path.shift();

			if (!nextStep) {
				this.$pathEnd.emit();
				unlisten();
			} else {
				this.animateTo(nextStep);
			}
		});

		const next = path.shift();
		if (next) {
			this.animateTo(next);
		}
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
