import { describe, expect, it, run } from '@test';
import { PersonEntity } from '../entities/entity.person.ts';
import { Material } from '../inventory/Material.ts';
import { Coordinate } from '../terrain/Coordinate.ts';
import { TradeFailReason, TradeOrder } from './TradeOrder.ts';

const material1 = new Material('alpha', { stackSize: 10, symbol: 'a' });
const material2 = new Material('beta', { stackSize: 10, symbol: 'b' });

describe('TradeOrder', () => {
	describe('.findFailReasons()', () => {
		it('every fail possible', () => {
			const owner1 = new PersonEntity('a', [0, 0, Infinity], { gender: 'm', firstName: 'test A' });
			const owner2 = new PersonEntity('b', [0, 0, Infinity], { gender: 'm', firstName: 'test B' });
			const order = new TradeOrder(
				{
					owner: owner1,
					inventory: owner1.inventory,
					money: 50,
					cargo: [{ material: material1, quantity: 9999 }],
				},
				{
					owner: owner2,
					inventory: owner2.inventory,
					money: 50,
					cargo: [{ material: material2, quantity: 9999 }],
				},
			);
			expect(order.findFailReasons().map(([reason]) => reason)).toEqual([
				TradeFailReason.NO_MONEY_1,
				TradeFailReason.NO_MONEY_2,
				TradeFailReason.NO_MATERIAL_1,
				TradeFailReason.NO_MATERIAL_2,
				TradeFailReason.NO_SPACE_1,
				TradeFailReason.NO_SPACE_2,
			]);
		});
		it('no fails at all', async () => {
			const owner1 = new PersonEntity('a', [0, 0, Infinity], { gender: 'm', firstName: 'test A' });
			const owner2 = new PersonEntity('b', [0, 0, Infinity], { gender: 'm', firstName: 'test B' });
			await owner1.wallet.set(51);
			await owner1.inventory.change(material1, 10);
			await owner2.wallet.set(51);
			await owner2.inventory.change(material2, 10);
			const order = new TradeOrder(
				{
					owner: owner1,
					inventory: owner1.inventory,
					money: 50,
					cargo: [{ material: material1, quantity: 1 }],
				},
				{
					owner: owner2,
					inventory: owner2.inventory,
					money: 50,
					cargo: [{ material: material2, quantity: 1 }],
				},
			);
			expect(order.findFailReasons().map(([reason]) => reason)).toEqual([]);
		});
	});
	it('.makeItHappen()', async () => {
		const owner1 = new PersonEntity('a', [0, 0, Infinity], { gender: 'm', firstName: 'test A' });
		const owner2 = new PersonEntity('b', [0, 0, Infinity], { gender: 'm', firstName: 'test B' });
		owner1.wallet.set(50);
		await owner1.inventory.change(material1, 10);
		await owner1.inventory.change(material2, 10);
		owner2.wallet.set(50);
		await owner2.inventory.change(material1, 10);
		await owner2.inventory.change(material2, 10);
		const order = new TradeOrder(
			{
				owner: owner1,
				inventory: owner1.inventory,
				money: 33,
				cargo: [
					{ material: material1, quantity: 10 },
					{ material: material2, quantity: 3 },
				],
			},
			{
				owner: owner2,
				inventory: owner2.inventory,
				money: 25,
				cargo: [
					{ material: material1, quantity: 3 },
					{ material: material2, quantity: 10 },
				],
			},
		);

		await order.makeItHappen(0);

		expect(owner1.wallet.get()).toBe(42);
		expect(owner2.wallet.get()).toBe(58);
		expect(owner1.inventory.availableOf(material1)).toBe(3);
		expect(owner1.inventory.availableOf(material2)).toBe(17);
		expect(owner2.inventory.availableOf(material1)).toBe(17);
		expect(owner2.inventory.availableOf(material2)).toBe(3);
	});
	// });
});
run();
