import React from 'react';
import {
	Container,
	Typography,
	Button,
	Grid
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import FilterType from '../types/FilterType';

const useStyles = makeStyles(theme => {
	return {
		button: {
			float: "right",
			margin: theme.spacing(1),
		}
	}
});

// Silly for the context of this assignment but I would imagine you would have many filters ordinarily

const filters = [
	{
		title: "Saved",
		value: "SAVED",
	},
	{
		title: "Default",
		value: "DEFAULT",
	}
]

interface FilterProps {
	setFilter: (val: FilterType) => void,
}

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
	const classes = useStyles();
	return (
		<Container>
			<>
				{filters.map(filter => (
					<div className={classes.button}>
						<Button 
							variant="contained"
							value={filter.value} // HACK: This is hacky
							onClick={(e) => setFilter(e.currentTarget.value as FilterType)} // HACK: This is hacky
						>
							{filter.title}
						</Button>
					</div>
				))}
			</>
		</Container>

	)
}

export default Filter;