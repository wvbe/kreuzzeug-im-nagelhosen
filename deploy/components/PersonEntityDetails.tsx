import { PersonEntity, PERSON_NEEDS } from '@lib';
import { FunctionComponent, useMemo } from 'react';
import { useEventedValue } from '../hooks/useEventedValue.ts';
import { Need } from '../library/src/entities/Need.ts';
import { Badge } from './atoms/Badge.tsx';
import { FillBar } from './atoms/FillBar.tsx';
import { InventoryUI } from './IntentoryUI.tsx';

const PersonEntityNeed: FunctionComponent<{ need: Need }> = ({ need }) => {
	const value = useEventedValue(need);
	const config = useMemo(() => PERSON_NEEDS.find((config) => config.id === need.id), [need.id]);
	const range = useMemo(
		() =>
			config?.moods.find(
				(item, i, all) => value > (all[i - 1]?.upUntil || -Infinity) && value < item.upUntil,
			),
		[config, value],
	);
	return (
		<FillBar
			ratio={value}
			label={need.label}
			labelRight={`${range?.label || ''} ${Math.round(value * 100)}%`}
		/>
	);
};

export const PersonEntityDetails: FunctionComponent<{ entity: PersonEntity }> = ({ entity }) => {
	const needs = useMemo(
		() => entity.needsList.map((need, index) => <PersonEntityNeed key={index} need={need} />),
		[entity],
	);
	return (
		<article className="entity-details">
			<Badge icon={entity.icon} title={entity.userData.firstName} subtitle={entity.title} />
			{needs}
			<InventoryUI inventory={entity.inventory} />
		</article>
	);
};
