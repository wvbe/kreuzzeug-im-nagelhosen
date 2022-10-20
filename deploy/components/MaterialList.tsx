import { FunctionComponent, useMemo } from 'react';
import { materials } from '@lib';
import { Cell, Row, Table } from './atoms/Table.tsx';

const materialsList = Object.keys(materials).map((key) => materials[key as keyof typeof materials]);

export const MaterialList: FunctionComponent = () => {
	const items = useMemo(
		() =>
			materialsList.map((material, i) => (
				<Row key={i}>
					<Cell>{material.label}</Cell>
					<Cell>{material.symbol}</Cell>
					<Cell>{material.stack}/stack</Cell>
				</Row>
			)),
		[],
	);
	return <Table>{items}</Table>;
};
