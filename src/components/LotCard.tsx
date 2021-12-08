import React, { useEffect, useState } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Button,
	Box,
	ButtonBase,
	Modal,
	Grid,
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Lot from "../types/Lot"
import HomePlan from '../types/HomePlan';
import { getCorrespondingHomes } from '../API/utils';
import HomeCard from './HomeCard';

const useStyles = makeStyles(theme => {
	return {
		card: {
			margin: theme.spacing(3),
		},
		activeCard: {
			margin: theme.spacing(3),
			border: "2px solid red",
		},
		title: {
			textAlign: "center",
		}, 
		address: {
			marginTop: 10,
			textAlign: "center",
			color: "black"
		},
		acres: {
			textAlign: "center",
			color: "grey"
		},
		tagContainer: {
			display: "flex",
			justifyContent: "center",
			padding: theme.spacing(1),
			borderBottom: "1px solid grey",
		},
		tag: {
			borderRadius: "20px",
			border: "1px solid grey",
			color: "grey",
			padding: theme.spacing(1),
		},
		description: {
			marginTop: theme.spacing(1),
		},
		saveButton: {
			float: "right",
			margin: theme.spacing(1),
		},
		buttonBase: {
			display: "flex",
			flexDirection: "column",
		}
	}
})

interface LotCardProps {
	lot: Lot,
	saved: Set<number> 
	setSaved: (lots: Set<number>) => void,
	clickable: boolean,
}

const LotCard: React.FC<LotCardProps> = ({ lot, saved, setSaved, clickable }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [homePlans, setHomePlans] = useState<HomePlan[]>([]);

	// HACK: Work around on a bug involving the save button in the compatable lots
	const [savedHomePlans, setSavedHomePlans] = useState<Set<number>>(new Set());

	useEffect(() => {
		const getHomePlans = async () => {
			setHomePlans(await getCorrespondingHomes(lot.lotId))
		}
		getHomePlans()
	}, [])

	const handleOpen = () => {
		if (!clickable) return;
		setOpen(true);
	}
	const handleClose = () => setOpen(false);

	const handleSave = () => {
		if (saved.has(lot.lotId)) {
			const newSaved = new Set(saved);
			newSaved.delete(lot.lotId);
			setSaved(newSaved);
		} else {
			const newSaved = new Set(saved);
			newSaved.add(lot.lotId);
			setSaved(newSaved);
		}
	}

	return (
		<div>
			<Card 
				sx={{maxWidth: 345}} 
				elevation={2} 
				className={open ? classes.activeCard : classes.card}
			>
				<ButtonBase 
					onClick={handleOpen} 
					className={classes.buttonBase}
				>
					<CardMedia
						component="img"
						height="140"
						image={lot.image}
						alt="Cool Home, totally should buy"
					/>
					<CardContent>
						<Typography variant="body1" className={classes.address}>{lot.address}</Typography>
						<Typography variant="body2" className={classes.acres}>{`${lot.acres} acres`}</Typography>

						<div className={classes.description}>
							<Typography variant="body1" className={classes.description}>{lot.description}</Typography>
						</div>
					</CardContent>

					</ButtonBase>

					<div className={classes.saveButton}>
						<Button 
							onClick={handleSave}
							variant="contained" 
							color={saved.has(lot.lotId) ? "secondary" : "primary"}
							endIcon={<FavoriteIcon />}
							>Save</Button>
					</div>
			</Card>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
  						top: '50%',
						left: '50%',
  						transform: 'translate(-50%, -50%)',
						maxHeight: '80%',
  						bgcolor: 'background.paper',
  						boxShadow: 24,
  						p: 4,
						overflowY: "auto",
					}}
				>
          		<Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: "center"}}>
						Compatable Home Plans 
          		</Typography>

					<Grid 
						container 
						spacing={3}
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						{homePlans.map(home => {
							return (
								<Grid item key={home.homePlanId}> 
									<HomeCard 
										home={home} 
										saved={savedHomePlans}
										setSaved={setSavedHomePlans}
										clickable={false}
									/>
								</Grid>
							)}) 
						}
					</Grid>
				</Box>
			</Modal>
		</div>
		
	)
}

export default LotCard;