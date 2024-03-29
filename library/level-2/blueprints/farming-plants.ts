import { Blueprint } from '@lib/core';
import * as materials from '../materials.ts';

export const growWheat = new Blueprint(
	'Growing wheat',
	[],
	[{ material: materials.wheat, quantity: 1 }],
	{
		workersRequired: 1,
		fullTimeEquivalent: 10000,
		buildingName: 'Wheat farm',
	},
);
