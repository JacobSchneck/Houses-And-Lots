import React, { createContext, useEffect, useState } from 'react';
import { API } from '../API/api';
import Lot from '../types/Lot';

const LotContext = createContext<Lot[]>([])

interface LotProviderProps {
	children: React.ReactNode,
}

const LotProivider: React.FC<LotProviderProps> = ({ children }) => {
	const [lots, setLots] = useState<Lot[]>([]);

	useEffect(() => {
		const getLots = async () => {
			setLots(await API.getLots());
		}
		getLots();
	}, [])

	const { Provider } = LotContext;

	return (
		<Provider value={lots}>
			{children}
		</Provider>
	);
}

export { LotContext, LotProivider }