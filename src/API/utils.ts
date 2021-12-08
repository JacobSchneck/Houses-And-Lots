import { Api } from '@mui/icons-material';
import HomePlan from '../types/HomePlan';
import Lot from '../types/Lot'
import { API } from './api'

// Javascript SQL join for to get corresponding lots to a home
const getCorrespondingLots = async (homePlanId: number): Promise<Lot[]> => {
	const combs = API.getCombinations()
		.then(res => res.map( r => {
			if (r.homePlanId === homePlanId) {
				return r.lotId;
			}
	}));

	const combSet = new Set(await combs);

	const lots = API.getLots()
		.then(res => res.filter(lot => combSet.has(lot.lotId)));

	return lots;
}

// Javascript SQL join for to get corresponding homes to a lot 
const getCorrespondingHomes = async (lotId: number): Promise<HomePlan[]> => {
	const combs = API.getCombinations()
		.then(res => res.map( r => {
			if (r.lotId === lotId) {
				return r.homePlanId;
			}
	}));

	const combSet = new Set(await combs);
	console.log(combSet);

	const homes = API.getHomePlans()
		.then(res => res.filter(home => combSet.has(home.homePlanId)));

	return homes;
}

export { getCorrespondingLots, getCorrespondingHomes }