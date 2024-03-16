import Game from '../../Game.ts';
import { EcsComponent } from './EcsComponent.ts';

type EcsSystemAttachor = (game: Game) => void | Promise<void>;

export class EcsSystem<Dependencies extends unknown[]> {
	public readonly dependencies: Dependencies;

	public readonly attachGame: EcsSystemAttachor;

	constructor(componentDependencies: Dependencies, onGameAttach: EcsSystemAttachor) {
		this.dependencies = componentDependencies;
		this.attachGame = onGameAttach;
	}
}