type BinaryHeapScorer<P> = (node: P) => number;

export class BinaryHeap<P> {
	scoreFunction: BinaryHeapScorer<P>;
	content: P[] = [];
	constructor(scoreFunction: BinaryHeapScorer<P>) {
		this.content = [];
		this.scoreFunction = scoreFunction;
	}
	push(element: P) {
		// Add the new element to the end of the array.
		this.content.push(element);

		// Allow it to sink down.
		this.sinkDown(this.content.length - 1);
	}
	pop() {
		// Store the first element so we can return it later.
		const result = this.content[0];

		// Get the element at the end of the array.
		const end = this.content.pop();
		if (!end) {
			return result;
		}

		// If there are any elements left, put the end element at the
		// start, and let it bubble up.
		if (this.content.length > 0) {
			this.content[0] = end;
			this.bubbleUp(0);
		}
		return result;
	}
	remove(node: P) {
		const i = this.content.indexOf(node);

		// When it is found, the process seen in 'pop' is repeated
		// to fill up the hole.
		const end = this.content.pop();
		if (!end) {
			return;
		}

		if (i !== this.content.length - 1) {
			this.content[i] = end;

			if (this.scoreFunction(end) < this.scoreFunction(node)) {
				this.sinkDown(i);
			} else {
				this.bubbleUp(i);
			}
		}
	}
	size() {
		return this.content.length;
	}
	rescoreElement(node: P) {
		this.sinkDown(this.content.indexOf(node));
	}
	sinkDown(n: number) {
		// Fetch the element that has to be sunk.
		const element = this.content[n];

		// When at 0, an element can not sink any further.
		while (n > 0) {
			// Compute the parent element's index, and fetch it.
			const parentN = ((n + 1) >> 1) - 1;
			const parent = this.content[parentN];
			// Swap the elements if the parent is greater.
			if (this.scoreFunction(element) < this.scoreFunction(parent)) {
				this.content[parentN] = element;
				this.content[n] = parent;
				// Update 'n' to continue at the new position.
				n = parentN;
			}
			// Found a parent that is less, no need to sink any further.
			else {
				break;
			}
		}
	}
	bubbleUp(n: number) {
		// Look up the target element and its score.
		const length = this.content.length;
		const element = this.content[n];
		const elemScore = this.scoreFunction(element);

		while (true) {
			// Compute the indices of the child elements.
			const child2N = (n + 1) << 1;
			const child1N = child2N - 1;
			// This is used to store the new position of the element, if any.
			let swap = null;
			let child1Score;
			// If the first child exists (is inside the array)...
			if (child1N < length) {
				// Look it up and compute its score.
				const child1 = this.content[child1N];
				child1Score = this.scoreFunction(child1);

				// If the score is less than our element's, we need to swap.
				if (child1Score < elemScore) {
					swap = child1N;
				}
			}

			// Do the same checks for the other child.
			if (child2N < length) {
				const child2 = this.content[child2N];
				const child2Score = this.scoreFunction(child2);
				// child1Score is number or undefined. To satisfy TS (for the original code) it is coerced to number,
				// but I'm not sure why it wouldn't stay undefined, really.
				if (child2Score < (swap === null ? elemScore : (child1Score as number))) {
					swap = child2N;
				}
			}

			// If the element needs to be moved, swap it, and continue.
			if (swap !== null) {
				this.content[n] = this.content[swap];
				this.content[swap] = element;
				n = swap;
			}
			// Otherwise, we are done.
			else {
				break;
			}
		}
	}
}
