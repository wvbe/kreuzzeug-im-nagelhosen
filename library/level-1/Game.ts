import { JobPosting } from './ecs/components/behaviorComponent/JobPosting.ts';
import { EntityBlackboard } from './ecs/components/behaviorComponent/types.ts';
import { Registry } from './classes/Registry.ts';
import { TimeLine } from './classes/TimeLine.ts';
import { DriverI } from './drivers/types.ts';
import { behaviorTreeSystem } from './ecs/systems/behaviorTreeSystem.ts';
import { productionSystem } from './ecs/systems/productionSystem.ts';
import { healthSystem } from './ecs/systems/healthSystem.ts';
import { selfsustainingSystem } from './ecs/systems/selfsustainingSystem.ts';
import { logisticsSystem } from './ecs/systems/logisticsSystem.ts';
import { EcsEntity } from './ecs/types.ts';
import { Collection } from './events/Collection.ts';
import { Event } from './events/Event.ts';
import { KeyedCollection } from './events/KeyedCollection.ts';
import { Blueprint } from './ecs/components/productionComponent/Blueprint.ts';
import { Material } from './inventory/Material.ts';
import { BehaviorTreeNodeI } from './mod.ts';
import { Terrain } from './terrain/Terrain.ts';
import { SavedGameJson } from './types-savedgame.ts';
import { SeedI } from './types.ts';

export type GameAssets = {
	behaviorNodes: Registry<BehaviorTreeNodeI<EntityBlackboard>>;
	materials: Registry<Material>;
	blueprints: Registry<Blueprint>;
};
export default class Game {
	public readonly driver: DriverI;

	public readonly terrain: Terrain;

	public readonly entities = new KeyedCollection<'id', EcsEntity>('id');

	public readonly time = new TimeLine();

	public readonly seed: SeedI;

	public readonly assets: GameAssets;

	public readonly jobs = new Collection<JobPosting>();

	/*
	 * EVENTS
	 */

	public readonly $resume = new Event('Game $resume');

	public readonly $pause = new Event('Game $pause');

	/*
	 * EVENTED VALUES
	 */

	constructor(driver: DriverI, seed: SeedI, terrain: Terrain, assets: GameAssets) {
		this.driver = driver;

		this.seed = seed;
		this.terrain = terrain;
		this.assets = assets;

		productionSystem.attachGame(this);
		behaviorTreeSystem.attachGame(this);
		healthSystem.attachGame(this);
		logisticsSystem.attachGame(this);
		selfsustainingSystem.attachGame(this);

		driver.attach(this);
	}

	/**
	 * Announces to all those who listen (but want to remain agnostic of the driver) that the
	 * game has started. This usually coincides with a render loop etc. being handled by the
	 * driver.
	 *
	 * Normally called by the driver, or from a unit test.
	 */
	public async start() {
		await this.$resume.emit();
	}

	public async stop() {
		await this.$pause.emit();
	}

	/**
	 * Serialize for a save game JSON
	 */
	public toSaveJson(): SavedGameJson {
		return {
			version: 'alpha', // todo version some time,
			terrain: this.terrain.toSaveJson(),
			// entities: this.entities.map((entity) =>
			// 	entity.toSaveJson(this.assets),
			// ) as SavedGameJson['entities'],
			time: this.time.toSaveJson(this.assets),
			seed: this.seed,
		};
	}
	public static async fromSaveJson(
		driver: DriverI,
		assets: GameAssets,
		save: SavedGameJson,
	): Promise<Game> {
		const game = new Game(driver, save.seed, Terrain.fromSaveJson(save.terrain), assets);
		// await game.entities.add(
		// 	...(await Promise.all(save.entities.map((entity) => castSaveJsonToEntity(assets, entity)))),
		// );
		return game;
	}
}
