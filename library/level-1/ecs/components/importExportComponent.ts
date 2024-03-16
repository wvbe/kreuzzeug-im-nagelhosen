import { MaterialState } from '../../inventory/types.ts';
import { EcsComponent } from '../classes/EcsComponent.ts';
import { inventoryComponent } from './inventoryComponent.ts';

export const importExportComponent = new EcsComponent<{
	provideMaterialsWhenAbove: MaterialState[];
	requestMaterialsWhenBelow: MaterialState[];
}>(
	(entity) =>
		inventoryComponent.test(entity) &&
		Array.isArray(entity.provideMaterialsWhenAbove) &&
		Array.isArray(entity.requestMaterialsWhenBelow),
);
