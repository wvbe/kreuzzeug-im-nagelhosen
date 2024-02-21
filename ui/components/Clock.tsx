import { Game, type DriverI } from '@lib';
import React, { FunctionComponent, useCallback } from 'react';
import { useEventedValue } from '../hooks/useEventedValue.ts';
import { FillBar } from './atoms/FillBar.tsx';
import { useDriverContext } from '../context/DriverContext.tsx';
import { useGameContext } from '../context/GameContext.tsx';

export const Clock: FunctionComponent = () => {
	const driver = useDriverContext();
	const game = useGameContext();
	const time = useEventedValue(game.time);
	const isAnimating = useEventedValue(driver.$$animating);
	const pause = useCallback(async () => {
		await driver.stop();
	}, []);
	const resume = useCallback(async () => {
		await driver.start();
	}, []);
	return (
		<div>
			<button onClick={pause} disabled={!isAnimating}>
				Pause
			</button>
			<button onClick={resume} disabled={isAnimating}>
				Resume
			</button>
			<FillBar
				ratio={(time % (1000 * 24)) / (1000 * 24)}
				label={`${Math.ceil(time / 1000)} hours since start of the game`}
			/>

			{game.time.getNextEventAbsoluteTime() === Infinity ? (
				<p>No events scheduled for the future</p>
			) : null}
		</div>
	);
};
