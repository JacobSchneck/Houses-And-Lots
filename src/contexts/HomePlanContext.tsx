import React, { createContext, useEffect, useState } from 'react';
import { API } from '../API/api';
import HomePlan from '../types/HomePlan';

const HomePlanContext = createContext<HomePlan[]>([])

interface HomePlanProviderProps {
	children: React.ReactNode,
}

const HomePlanProvider: React.FC<HomePlanProviderProps> = ({ children }) => {
	const [homePlan, setHomePlans] = useState<HomePlan[]>([]);
	
	useEffect(() => {
		const getHomePlans = async () => {
			setHomePlans(await API.getHomePlans());
		}
		getHomePlans();
	}, [])

	const { Provider } = HomePlanContext;

	return (
		<Provider value={homePlan}>
			{children}
		</Provider>
	);
}

export { HomePlanContext, HomePlanProvider }
