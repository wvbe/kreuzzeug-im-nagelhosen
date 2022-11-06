import { Blueprint } from '../inventory/Blueprint.ts';
import {
	bran,
	bronzeIngot,
	butter,
	copperIngot,
	flour,
	freshWater,
	honey,
	ironIngot,
	milk,
	rawCopperOre,
	rawIronOre,
	rawTinOre,
	tinIngot,
	wheat,
} from './materials.ts';

export const getWaterFromWell = new Blueprint(
	'Drawing water',
	[],
	[{ material: freshWater, quantity: 3 }],
	{
		workersRequired: 0,
		fullTimeEquivalent: 4500,
		buildingName: 'Water well',
	},
);

export const growWheat = new Blueprint('Growing wheat', [], [{ material: wheat, quantity: 1 }], {
	fullTimeEquivalent: 10000,
	buildingName: 'Wheat farm',
});

export const wheatProcessing = new Blueprint(
	'Grinding wheat',
	[{ material: wheat, quantity: 2 }],
	[
		{ material: flour, quantity: 1 },
		{ material: bran, quantity: 1 },
	],
	{
		workersRequired: 1,
		fullTimeEquivalent: 5000,
		buildingName: 'Mill',
	},
);

export const beeKeeping = new Blueprint('Bee-keeping', [], [{ material: honey, quantity: 2 }], {
	fullTimeEquivalent: 8000,
	buildingName: 'Apiary',
});

export const butterMaking = new Blueprint(
	'Making butter',
	[{ material: milk, quantity: 2 }],
	[{ material: butter, quantity: 1 }],
	{
		fullTimeEquivalent: 7000,
		buildingName: 'Butter factory',
	},
);
export const ironIngotProduction = new Blueprint(
	'Making iron ingots',
	[{ material: rawIronOre, quantity: 3 }],
	[{ material: ironIngot, quantity: 1 }],
	{
		workersRequired: 2,
		fullTimeEquivalent: 5000,
		buildingName: 'Iron foundry',
	},
);
export const copperIngotProduction = new Blueprint(
	'Making copper ingots',
	[{ material: rawCopperOre, quantity: 3 }],
	[{ material: copperIngot, quantity: 1 }],
	{
		workersRequired: 2,
		fullTimeEquivalent: 5000,
		buildingName: 'Copper foundry',
	},
);
export const tinIngotProduction = new Blueprint(
	'Making tin ingots',
	[{ material: rawTinOre, quantity: 3 }],
	[{ material: tinIngot, quantity: 1 }],
	{
		workersRequired: 2,
		fullTimeEquivalent: 5000,
		buildingName: 'Tin foundry',
	},
);
export const bronzeIngotProduction = new Blueprint(
	'Making bronze ingots',
	[
		{ material: copperIngot, quantity: 0.88 },
		{ material: tinIngot, quantity: 0.12 },
	],
	[{ material: bronzeIngot, quantity: 1 }],
	{
		workersRequired: 2,
		fullTimeEquivalent: 5000,
		buildingName: 'Bronze foundry',
	},
);