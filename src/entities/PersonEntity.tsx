import { Event } from '../classes/Event';
import Logger from '../classes/Logger';
import { Path } from '../classes/Path';
import { getRandomFemaleFirstName, getRandomMaleFirstName } from '../constants/names';
import { EntityPersonI, TileI } from '../types';
import { Entity } from './Entity';

export class PersonEntity extends Entity implements EntityPersonI {
	// The event that the person finishes a path, according to react-spring's timing
	public readonly $stoppedWalking = new Event<[]>();

	// The person started one step
	public readonly $startedWalkStep = new Event<[TileI, number]>();

	// The person started finished one step, according to react-spring's timing
	public readonly $stoppedWalkStep = new Event<[TileI]>();

	protected readonly userData: { firstName: string };

	constructor(
		id: string,
		location: TileI,
		userData = {
			firstName: Math.random() < 0.5 ? getRandomFemaleFirstName() : getRandomMaleFirstName()
		}
	) {
		super(id, location);
		this.userData = userData;

		// Movement handling
		this.$stoppedWalkStep.on(loc => {
			this.location = loc;
		});
	}

	// Calculate a path and emit animations to walk it the whole way. `this.location` is updated in between each step
	public walkTo(destination: TileI) {
		if (!this.location.terrain) {
			throw new Error(`Entity "${this.id}" is trying to path in a detached coordinate`);
		}
		const path = new Path(this.location.terrain, { closest: true }).find(
			this.location,
			destination
		);

		if (!path.length) {
			Logger.warn('Path was zero steps long, finishing early.');
			// debugger;
			this.$stoppedWalking.emit();
			return;
		}
		const unlisten = this.$stoppedWalkStep.on(() => {
			const nextStep = path.shift();

			if (!nextStep) {
				this.$stoppedWalking.emit();
				unlisten();
			} else {
				this.doPathStep(nextStep);
			}
		});

		this.doPathStep(path.shift() as TileI);
	}
	/**
	 * Move entity directly to a coordinate. Does not consider accessibility or closeness.
	 */
	private doPathStep(coordinate: TileI) {
		if (coordinate.hasNaN()) {
			// @TODO remove or throw
			debugger;
		}
		const distance = this.location.euclideanDistanceTo(coordinate);

		this.$startedWalkStep.emit(coordinate, 1000);
	}

	public get label(): string {
		return this.userData.firstName;
	}
}
