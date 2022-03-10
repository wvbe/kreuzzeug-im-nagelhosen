import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import Logger from '../classes/Logger';
import { PersonEntity } from '../entities/PersonEntity';
import { PersonEntityC } from '../entities/PersonEntityC';
import { Game } from '../Game';
import { Viewport } from '../space/Viewport';
import { DualMeshTerrainC } from '../terrain/DualMeshTerrainC';
import { EntityI, TileI } from '../types';
import { ActiveEntityOverlay } from './ActiveEntityOverlay';
import { ContextMenuButton, ContextMenuContainer, ContextMenuFooter } from './ContextMenu';
import { Overlay } from './Overlay';

function fancyTimeFormat(seconds: number) {
	return `${~~((seconds % 3600) / 60)}′ ${Math.floor(seconds % 60)}″`;
}
function fakeCoordinates(x: number, y: number) {
	return `40° ${fancyTimeFormat(1000 - x * 13)} N 79° ${fancyTimeFormat(700 - y * 13)} W`;
}

export const GameApplication: FunctionComponent<{
	game: Game;
	initialViewportCenter: TileI;
}> = ({ game, initialViewportCenter }) => {
	const { scene, contextMenu } = game;

	const [center, setCenter] = useState(initialViewportCenter);

	const [activeEntity, setActiveEntity] = useState<EntityI | undefined>(undefined);

	const terrain = useMemo(
		() => (
			<DualMeshTerrainC
				terrain={scene.terrain}
				onTileClick={(event, tile) => {
					contextMenu.open(
						tile,
						<>
							<ContextMenuButton onClick={() => setCenter(tile)}>
								Center camera
							</ContextMenuButton>
							<ContextMenuButton
								onClick={() => {
									Logger.group(`Tile ${tile}`);
									Logger.log(tile);
									Logger.groupEnd();
								}}
							>
								Show in console
							</ContextMenuButton>
							<ContextMenuFooter>{fakeCoordinates(tile.x, tile.y)}</ContextMenuFooter>
						</>
					);
				}}
				onTileContextMenu={(event, tile) => {
					setCenter(tile);
				}}
			/>
		),
		[scene, contextMenu]
	);

	const entities = useMemo(
		() =>
			scene.entities
				.filter((entity): entity is PersonEntity => entity instanceof PersonEntity)
				.map(entity => (
					<PersonEntityC
						key={entity.id}
						entity={entity}
						onClick={event => {
							event.preventDefault();
							setActiveEntity(entity);
						}}
					/>
				)),
		[scene.entities]
	);

	useEffect(() => {
		const cb = () => {
			contextMenu.close();
		};

		window.addEventListener('click', cb);
		return () => window.removeEventListener('click', cb);
	}, [contextMenu]);

	return (
		<>
			<Viewport center={center} zoom={1} overlay={<ContextMenuContainer zoom={1} />}>
				<g id="scene__terrain">{terrain}</g>
				<g id="scene__entities">{entities}</g>
			</Viewport>
			<Overlay>
				<ActiveEntityOverlay entity={activeEntity} />
				<p style={{ fontSize: '0.8em', opacity: '0.5' }}>
					<a
						href="https://github.com/wvbe/kreuzzeug-im-nagelhosen"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
					{'    '}
					Seed: {scene.seed}
				</p>
			</Overlay>
		</>
	);
};