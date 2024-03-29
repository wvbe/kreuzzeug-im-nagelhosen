import {
	Collection,
	EcsArchetypeEntity,
	EcsEntity,
	Event,
	locationComponent,
	personArchetype,
} from '@lib';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { EventCombination } from '../../library/level-1/events/EventCombination.ts';
import { useGameContext } from '../context/GameContext.tsx';
import { useMemoFromEvent } from '../hooks/useEventedValue.ts';
import { CollapsibleWindow } from './atoms/CollapsibleWindow.tsx';
import { Cell, Row, Table } from './atoms/Table.tsx';
import { TokenizedText } from './atoms/TokenizedText.tsx';
// import { LineGraph } from './LineGraph.tsx';

export function useCombinedEventCollection<T>(
	collection: Collection<T>,
	otherEvent?: Event<any[]>,
) {
	const combinedEvent = useMemo(
		() =>
			otherEvent
				? new EventCombination('combined event', [collection.$change, otherEvent])
				: collection.$change,
		[],
	);
	return useMemoFromEvent<any[], T[]>(
		combinedEvent,
		collection.slice(),
		useCallback(() => collection.slice(), [collection]),
	);
}

export const JobList: FunctionComponent<{
	entity?: EcsArchetypeEntity<typeof personArchetype>;
}> = ({ entity }) => {
	const game = useGameContext();

	const jobs = useCombinedEventCollection(game.jobs, entity?.$$location);
	const sortedJobs = useMemo(
		() =>
			jobs
				.map((job) => ({
					label: job.label,
					vacancies: job.vacancies,
					score: entity ? job.score({ game, entity }) : 0,
				}))
				.sort((a, b) => b.score - a.score)
				.map((job, index) => (
					<Row key={index}>
						<Cell>
							<TokenizedText text={job.label} />
						</Cell>
						<Cell>{job.vacancies}</Cell>
						<Cell>{job.score}</Cell>
					</Row>
				)),
		[jobs, entity],
	);

	return (
		<CollapsibleWindow label={`Job board`} initiallyOpened>
			<Table>{sortedJobs}</Table>
		</CollapsibleWindow>
	);
};
