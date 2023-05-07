import { PersonEntity, PERSON_NEEDS, Need } from '@lib';
import React, { FunctionComponent, useMemo } from 'react';
import { useEventedValue } from '../hooks/useEventedValue.ts';
import { Badge } from './atoms/Badge.tsx';
import { FillBar } from './atoms/FillBar.tsx';
import { BehaviorTree } from './BehaviorTree.tsx';
import { InventoryUI } from './InventoryUI.tsx';
import { TradeOrderLog } from './TradeOrderLog.tsx';

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
		() => entity.needs.map((need, index) => <PersonEntityNeed key={index} need={need} />),
		[entity],
	);
	const behavior = useEventedValue(entity.$behavior);
	return (
		<article className="entity-details">
			{needs}
			<InventoryUI inventory={entity.inventory} wallet={entity.wallet} />
			<TradeOrderLog entity={entity} log={entity.$log} />
		</article>
	);
};