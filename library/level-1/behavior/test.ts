import { expect, it, describe, run } from 'tincan';
import { EventedPromise } from '../classes/EventedPromise.ts';
import { ExecutionNode } from './ExecutionNode.ts';
import { SelectorNode } from './SelectorNode.ts';
import { SequenceNode } from './SequenceNode.ts';

describe('BehaviorTree', () => {
	describe('A man walks into a bar...', () => {
		// Test the decision tree from a clear article/tutorial somewhere on the internet:
		//   https://towardsdatascience.com/designing-ai-agents-behaviors-with-behavior-trees-b28aa1c3cf8a
		//
		// In this test we're using the fact that EventedPromise doubles as the signal in our BehaviorTree.
		// We can simply return those promises from execution nodes and check for object equality later,
		// so that there's no need to actually run any functions for purposes of this test :)

		const moveToDoor = new EventedPromise();
		const openDoor = new EventedPromise();
		const enterRoom = new EventedPromise();

		const tree = new SelectorNode<{
			isAtDoor: boolean;
			isDoorOpen: boolean;
			isInRoom: boolean;
		}>(
			new ExecutionNode('is in room?', (bb) =>
				bb.isInRoom ? EventedPromise.resolve() : EventedPromise.reject(),
			),
			new SequenceNode(
				new SelectorNode(
					new ExecutionNode('is at the door??', (bb) =>
						bb.isAtDoor ? EventedPromise.resolve() : EventedPromise.reject(),
					),
					new ExecutionNode('move towards door', () => moveToDoor),
				),
				new SelectorNode(
					new ExecutionNode('is door open?', (bb) =>
						bb.isDoorOpen ? EventedPromise.resolve() : EventedPromise.reject(),
					),
					new ExecutionNode('open door', () => openDoor),
				),
				new ExecutionNode('enter room', () => enterRoom),
			),
		);

		it('When not at the door, running action is moving to door', () => {
			const provenance: number[] = [];
			const signal = tree.evaluate(
				{
					isAtDoor: false,
					isDoorOpen: false,
					isInRoom: false,
				},
				provenance,
			);
			expect(signal.isBusy).toBeTruthy();

			// @TODO Assert that the correct function is called, or assert provenance
			// expect(signal).toBe(moveToDoor);
			// expect(provenance).toEqual([1, 0, 1]);
		});

		it('When door not open, running action is opening door', () => {
			const provenance: number[] = [];
			const signal = tree.evaluate(
				{
					isAtDoor: true,
					isDoorOpen: false,
					isInRoom: false,
				},
				provenance,
			);
			expect(signal.isBusy).toBeTruthy();

			// @TODO Assert that the correct function is called, or assert provenance
			// expect(signal).toBe(openDoor);
			// expect(provenance).toEqual([1, 1, 1]);
		});

		it('When not in room, running action is entering room', () => {
			const provenance: number[] = [];
			const signal = tree.evaluate(
				{
					isAtDoor: true,
					isDoorOpen: true,
					isInRoom: false,
				},
				provenance,
			);
			expect(signal.isBusy).toBeTruthy();

			// @TODO Assert that the correct function is called, or assert provenance
			// expect(signal).toBe(enterRoom);
			// expect(provenance).toEqual([1, 2]);
		});

		it('When entering room is not possible, all fails', () => {
			const provenance: number[] = [];
			enterRoom.reject();
			const signal = tree.evaluate(
				{
					isAtDoor: true,
					isDoorOpen: true,
					isInRoom: false,
				},
				provenance,
			);
			expect(signal.isRejected).toBe(true);

			// @TODO Assert that the correct function is called, or assert provenance
			// expect(provenance).toEqual([1, 2]);
		});

		it('When in room, behavior tree is a success', () => {
			const provenance: number[] = [];
			const signal = tree.evaluate(
				{
					isAtDoor: false,
					isDoorOpen: false,
					isInRoom: true,
				},
				provenance,
			);
			expect(signal.isResolved).toBe(true);

			// @TODO Assert that the correct function is called, or assert provenance
			// expect(provenance).toEqual([0]);
		});
	});
});

run();