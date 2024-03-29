import { Need, PERSON_NEEDS } from '@lib';
import React, { FunctionComponent, useMemo } from 'react';

import { EcsEntity, needsComponent } from '@lib';
import { FillBar } from '../../components/atoms/FillBar.tsx';
import { useEventedValue } from '../../hooks/useEventedValue.ts';

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

export const EntityNeedsDetails: FunctionComponent<{ entity: EcsEntity }> = ({ entity }) => {
	const needs = (entity as EcsEntity<typeof needsComponent>).needs;
	if (!needs) {
		return null;
	}
	return (
		<>
			{Object.entries(needs).map(([key, need]) => (
				<PersonEntityNeed key={key} need={need} />
			))}
		</>
	);
};
