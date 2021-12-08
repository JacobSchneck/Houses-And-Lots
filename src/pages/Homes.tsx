import { useState, useContext } from 'react';
import HomeCard from '../components/HomeCard'
import { Grid } from '@mui/material';
import Filter from '../components/Filter';
import FilterType from '../types/FilterType';

import { HomePlanContext } from '../contexts/HomePlanContext';


const Homes = () => {
	const [saved, setSaved] = useState<Set<number>>(new Set());
	const [filter, setFilter] = useState<FilterType>("DEFAULT");

	const homePlans = useContext(HomePlanContext);

	return (
		<div>
			<div style={{marginTop: "25px"}}>
				<Filter setFilter={setFilter}/>
			</div>
			<Grid container spacing={3}>
				{
					filter == "DEFAULT" ?
						homePlans.map(home => {
							return (
								<Grid item key={home.homePlanId} xs={12} md={6} lg={4}>
									<HomeCard 
										home={home} 
										saved={saved} 
										setSaved={setSaved}
										clickable={true}
									/>
								</Grid>
							)})
							:
						homePlans.filter(home => saved.has(home.homePlanId)).map(home => {
							return (
								<Grid item key={home.homePlanId} xs={12} md={6} lg={4}>
									<HomeCard 
										home={home} 
										saved={saved} 
										setSaved={setSaved}
										clickable={true}
									/>
								</Grid>
							)})
					}
				
			</Grid>
		</div>
	)
}

export default Homes;
