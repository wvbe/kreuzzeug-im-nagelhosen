import MeshBuilder from '@redblobgames/dual-mesh/create';
import Poisson from 'poisson-disk-sampling';
import { Terrain } from '../terrain/Terrain.ts';
import { CoordinateArray } from '../classes/Coordinate.ts';
import { Random } from '../classes/Random.ts';
import { DualMeshTile } from '../terrain/DualMeshTile.ts';
import { type SeedI } from '../types.ts';

export function generateDualMeshTerrain(seed: SeedI, size: number, density: number = 1) {
	// Use @redblobgames/dual-mesh to generate tiles and relationships.
	// More information:
	// - https://redblobgames.github.io/dual-mesh/
	// - https://github.com/redblobgames/dual-mesh
	let i = 0;
	const poisson = new Poisson(
		{
			shape: [size, size],
			minDistance: 1 / density,
		},
		() => Random.float(seed, ++i),
	);
	const meshBuilder = new MeshBuilder({ boundarySpacing: 1 });
	meshBuilder.points.forEach((p) => poisson.addPoint(p));
	meshBuilder.points = poisson.fill().map((xy, i: number) => {
		const z = (Random.float(seed, 'poisson', i) - 0.3) * 2; // < 0.3 ? -0.1 : 0
		return [...xy, z > 0 ? z * 0.25 : z];
	});

	const mesh = meshBuilder.create();
	const tiles = meshBuilder.points
		.map((coordinates, i) => {
			const outline = mesh.r_circulate_t([], i);
			return new DualMeshTile(
				...(coordinates as CoordinateArray),
				outline.map((i: number) => [mesh.t_x(i), mesh.t_y(i)]),
				outline.some((index: number) => mesh.t_ghost(index)),
			);
		})
		.map((tile, i, tiles) => {
			tile.neighbors.push(
				...mesh
					.r_circulate_r([], i)
					.map((x: keyof Terrain['tiles']) => tiles[x])
					.filter((x): x is DualMeshTile => !!x),
			);

			return tile;
		})
		.filter(Boolean);

	const terrain = new Terrain(size, tiles);

	return terrain;
}
