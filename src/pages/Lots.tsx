
import { useContext, useState } from 'react';
import { Grid } from '@mui/material';
import LotCard from '../components/LotCard';
import Filter from '../components/Filter';
import FilterType from '../types/FilterType'
import { LotContext } from '../contexts/LotContext';

const Lots = () => {
	const [saved, setSaved] = useState<Set<number>>(new Set());
	const [filter, setFilter] = useState<FilterType>("DEFAULT");

	const lots = useContext(LotContext);

	return (
		<div>
			<div style={{marginTop: "25px"}}>
				<Filter setFilter={setFilter}/>
			</div>
			<Grid container spacing={3}>
				{
					filter == "DEFAULT" ? 
						lots.map(lot => {
							return (
								<Grid item key={lot.lotId} xs={12} md={6} lg={4}>
									<LotCard 
										lot={lot} 
										saved={saved}
										setSaved={setSaved}
										clickable={true}
									/>
								</Grid>
							)}) 
						: 
						lots.filter(lot => saved.has(lot.lotId)).map(lot => {
							return (
								<Grid item key={lot.lotId} xs={12} md={6} lg={4}>
									<LotCard 
										lot={lot} 
										saved={saved}
										setSaved={setSaved}
										clickable={true}
									/>
								</Grid>
							)
						})
				}
			</Grid>
		</div>
	)
}

export default Lots;