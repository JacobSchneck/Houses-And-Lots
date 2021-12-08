import React, { createContext, useEffect, useState } from 'react';
import { API } from '../API/api';
import HomeLotCombination from '../types/HomeLotCombination';

const CombinationContext = createContext<HomeLotCombination[]>([]);

interface CombinationProviderProps {
	children: React.ReactNode,
}

// I decided not to use CombinationProvider because I found the resulting code to be clunky
// and not worth  the trouble. However, I am still including it in the global state as requested
const CombinationProivider: React.FC<CombinationProviderProps> = ({ children }) => {
	const [combinations, setCombinations] = useState<HomeLotCombination[]>([]);

	useEffect(() => {
		const getCombinations = async () => {
			setCombinations(await API.getCombinations());
		}
		getCombinations();
	}, [])

	const { Provider } = CombinationContext;

	return (
		<Provider value={combinations}>
			{children}
		</Provider>
	);
}

export { CombinationContext, CombinationProivider }
