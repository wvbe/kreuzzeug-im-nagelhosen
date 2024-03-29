import { Blueprint } from '@lib/core';
import * as materials from '../materials.ts';

export const getWaterFromWell = new Blueprint(
	'Drawing water',
	[],
	[{ material: materials.freshWater, quantity: 3 }],
	{
		workersRequired: 0,
		fullTimeEquivalent: 4500,
		buildingName: 'Water well',
	},
);
