import React, { FunctionComponent } from 'react';
import { Game } from './Game';
import { useEventReducer } from './hooks/events';
import { RendererThree } from './rendering/RendererThree';
import { ActiveEntityOverlay } from './ui/ActiveEntityOverlay';
import { Overlay } from './ui/Overlay';

export const GameC: FunctionComponent<{
	game: Game;
}> = ({ game }) => {
	const focusedItem = useEventReducer(game.ui.$focus, () => game.ui.focus, []);

	return (
		<>
			<RendererThree />
			<Overlay>
				<ActiveEntityOverlay entity={focusedItem} />
				<p style={{ fontSize: '0.8em', opacity: '0.5' }}>
					<a
						href="https://github.com/wvbe/kreuzzeug-im-nagelhosen"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
					{'    '}
					Seed: {game.seed}
				</p>
			</Overlay>
		</>
	);
};
