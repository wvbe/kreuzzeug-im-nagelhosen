import { type SimpleCoordinate } from '../types.ts';
import { Entity } from './entity.ts';
import { EntityI } from './types.ts';
import { Inventory } from '../inventory/Inventory.ts';

export type BuildingParameters = {
	baseWidth: number;
	baseDepth: number;
	baseHeight: number;
	roofHeight: number;
};

/**
 * @deprecated Should probably use settlement entity instead
 */
export class BuildingEntity extends Entity implements EntityI {
	public type = 'buiding';

	protected readonly parameters: BuildingParameters;

	constructor(id: string, location: SimpleCoordinate, parameters: BuildingParameters) {
		super(id, location);
		this.parameters = parameters;
	}
}
