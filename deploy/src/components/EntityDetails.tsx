import {
	type EntityI,
	type FactoryBuildingEntity,
	type MarketBuildingEntity,
	type PersonEntity,
} from '@lib';
import { FunctionComponent, useMemo } from 'react';
import { useSelectedEntity } from '../hooks/useSelectedEntity.ts';
import { EntityBadge } from './EntityBadge.tsx';
import { FactoryBuildingEntityDetails } from './FactoryBuildingEntityDetails.tsx';
import { MarketBuildingEntityDetails } from './MarketBuildingEntityDetails.tsx';
import { PersonEntityDetails } from './PersonEntityDetails.tsx';

export const EntityDetails: FunctionComponent<{ entity?: EntityI }> = ({ entity }) => {
	if (!entity) {
		return null;
	}
	const extra = useMemo(() => {
		if (entity.type === 'person') {
			return <PersonEntityDetails entity={entity as PersonEntity} />;
		} else if (entity.type === 'market-stall') {
			return <MarketBuildingEntityDetails entity={entity as MarketBuildingEntity} />;
		} else if (entity.type === 'factory') {
			return <FactoryBuildingEntityDetails entity={entity as FactoryBuildingEntity} />;
		}
	}, [entity]);

	return (
		<>
			<EntityBadge entity={entity} />
			{extra}
		</>
	);
};

export const SelectedEntityDetails: FunctionComponent = () => {
	const selectedEntity = useSelectedEntity();
	return <EntityDetails entity={selectedEntity || undefined} />;
};