// An adaptation of:
//   javascript-astar 0.4.1
//   http://github.com/bgrins/javascript-astar
//   Freely distributable under the MIT License.
//   Implements the astar search algorithm in javascript using a Binary Heap.
//   Includes Binary Heap (with modifications) from Marijn Haverbeke.
//   http://eloquentjavascript.net/appendix2.html

import { type Terrain } from '../../../terrain/Terrain.ts';
import { TileI } from '../../../types.ts';
import { BinaryHeap } from './BinaryHeap.ts';

// See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
type HeuristicScorer = (a: TileI, b: TileI) => number;

/**
 * Perform an A* Search on a graph given a start and end node.
 */

type HeuristicReport = {
	coordinate: TileI;
	h: number;
	g: number;
	f: number;
	parent: HeuristicReport | null;
	closed: boolean;
	visited: boolean;
};

type PathOptions = {
	closest: boolean;
	heuristic?: HeuristicScorer;
};

/**
 * @TODO
 */
function getVisitationCost(_terrain: Terrain, _from: TileI, _neighbor: TileI) {
	return 1;
}

export class Path {
	readonly #terrain: Terrain;
	readonly #options: PathOptions;
	readonly #cache: Map<TileI, HeuristicReport>;
	readonly #heap: BinaryHeap<TileI>;
	readonly #heuristic: HeuristicScorer;

	constructor(graph: Terrain, options: PathOptions) {
		this.#terrain = graph;
		this.#options = options;
		this.#cache = new Map<TileI, HeuristicReport>();
		this.#heap = new BinaryHeap<TileI>((node) => {
			const heuristic = this.#cache.get(node);
			if (!heuristic) {
				throw new Error('This is weird');
			}
			return heuristic.f;
		});
		this.#heuristic = (pos0, pos1) => {
			return pos0.euclideanDistanceTo(pos1);
		};
	}

	public findPathBetween(start: TileI, end: TileI) {
		let closestNode = start; // set the start node to be the closest if required
		let closestNodeHeuristics: HeuristicReport = {
			coordinate: closestNode,
			h: this.#heuristic(start, end),
			g: 0,
			f: 0,

			parent: null,

			// Unsure what the default value should be
			closed: true,
			visited: true,
		};

		// At this stage `start` is also `closestNode`, so lets associate those heuristics
		this.#cache.set(start, closestNodeHeuristics);

		this.#heap.push(start);

		while (this.#heap.size() > 0) {
			// Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
			const currentNode = this.#heap.pop();
			const currentNodeHeuristics = this.#cache.get(currentNode);
			if (!currentNodeHeuristics) {
				throw new Error('Somehow opening a node that has no heuristic data');
			}

			// End case -- result has been found, return the traced path.
			if (currentNode.equals(end)) {
				return this.tracePath(currentNodeHeuristics);
			}

			// Normal case -- move currentNode from open to closed, process each of its neighbors.
			currentNodeHeuristics.closed = true;

			// Find all neighbors for the current node.
			const neighbors = this.#terrain.getNeighborTiles(currentNode);

			for (let i = 0, il = neighbors.length; i < il; ++i) {
				const neighbor = neighbors[i];
				let neighborHeuristics = this.#cache.get(neighbor);

				if (neighborHeuristics?.closed || !neighbor.isLand()) {
					// Not a valid node to process, skip to next neighbor.
					continue;
				}

				// The g score is the shortest distance from start to current node.
				// We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
				const gScore =
					currentNodeHeuristics.g + getVisitationCost(this.#terrain, currentNode, neighbor);
				const beenVisited = !!neighborHeuristics;

				if (!beenVisited || (neighborHeuristics && gScore < neighborHeuristics.g)) {
					const hScore = this.#heuristic(neighbor, end);
					// Found an optimal (so far) path to this node.  Take score for node to see how good it is.
					neighborHeuristics = {
						coordinate: neighbor,
						h: hScore,
						g: gScore,
						f: gScore + hScore,
						parent: currentNodeHeuristics,
						closed: true,
						visited: true,
					};
					this.#cache.set(neighbor, neighborHeuristics as HeuristicReport);

					if (this.#options.closest) {
						// If the neighbour is closer than the current closestNode or if it's equally close but has
						// a cheaper path than the current closest node then it becomes the closest node
						if (
							neighborHeuristics.h < closestNodeHeuristics.h ||
							(neighborHeuristics.h === closestNodeHeuristics.h &&
								neighborHeuristics.g < closestNodeHeuristics.g)
						) {
							closestNode = neighbor;
							closestNodeHeuristics = neighborHeuristics;
						}
					}

					if (!beenVisited) {
						// Pushing to heap will put it in proper place based on the 'f' value.
						this.#heap.push(neighbor);
					} else {
						// Already seen the node, but since it has been rescored we need to reorder it in the heap
						this.#heap.rescoreElement(neighbor);
					}
				}
			}
		}

		if (this.#options.closest) {
			return this.tracePath(closestNodeHeuristics);
		}

		// No result was found - empty array signifies failure to find path.
		// @TODO this is a costly non-answer? investigate when you see this log message maybe:
		return [];
	}

	/**
	 * Out of a few different destinations, pick the one that is the easiest to get to, and return
	 * the path to it.
	 *
	 * @NOTE
	 * - Currently picks the destination _closest to the start_ but not necessarily with the shortest
	 *   path to it.
	 * - As an optimization, may weed out the tiles that are on a different island early.
	 */
	public findPathToClosest(start: TileI, options: TileI[]) {
		const nearest: { tile: TileI; distance: number; path?: TileI[] }[] = options
			.map((tile) => ({
				tile,
				distance: start.euclideanDistanceTo(tile),
			}))
			.sort((a, b) => a.distance - b.distance);

		// @TODO possibly filter churches that are on the same island? Could make the pathing function a little
		// less expensive.

		const shortest = nearest.reduce((last, option) => {
			if (last.path) {
				return last;
			}
			const path = this.findPathBetween(start, option.tile);
			if (!path.length) {
				return last;
			}
			return {
				...option,
				path,
			};
		}, nearest[0]);
		if (!shortest.path) {
			return null;
		}
		return {
			tile: shortest.tile,
			path: shortest.path,
		};
	}

	private tracePath(heuristicReport: HeuristicReport) {
		let curr = heuristicReport;
		const path = [];
		while (curr.parent) {
			path.unshift(curr);
			curr = curr.parent;
		}
		return path.map((heuristicReport) => heuristicReport.coordinate);
	}

	static find(graph: Terrain, start: TileI, end: TileI, options: PathOptions) {
		const p = new Path(graph, options);
		return p.findPathBetween(start, end);
	}
}
