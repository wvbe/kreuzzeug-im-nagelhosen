import React, { type FunctionComponent } from 'react';
import { createRoot } from 'react-dom';

import { GameInterface, useGeneratedGame } from '@ui';
import { factoryTest } from '@scenarios';
import { BrowserDriver } from './BrowserDriver.ts';

const driver = new BrowserDriver();

const Application: FunctionComponent = () => {
	const game = useGeneratedGame(factoryTest, driver);

	if (!game) {
		return <p className="please-wait">Please wait…</p>;
	}

	return <GameInterface game={game} driver={driver} />;
};

createRoot(self.document.getElementById('root')).render(<Application />);
