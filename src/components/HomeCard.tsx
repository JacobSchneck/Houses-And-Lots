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
import HomePlan from '../types/HomePlan';
import { makeStyles } from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Lot from '../types/Lot';
import { getCorrespondingLots } from '../API/utils';
import LotCard from './LotCard';

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
		info: {
			marginTop: 10,
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

interface HomeCardProps {
	home: HomePlan,
	saved: Set<number>,
	setSaved: (homes: Set<number>) => void,
	clickable: boolean,
}

const HomeCard: React.FC<HomeCardProps> = ({ home, saved, setSaved, clickable }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [lots, setLots] = useState<Lot[]>([]);
	
	// HACK: Work around on a bug involving the save button in the compatable lots
	const [savedLots, setSavedLots] = useState<Set<number>>(new Set());

	useEffect(() => {
		const getLots = async () => {
			setLots(await getCorrespondingLots(home.homePlanId));
		}
		getLots()
	}, [])

	const handleOpen = () => {
		if (!clickable) return;
		setOpen(true);
	}
	const handleClose = () => setOpen(false);

	const handleSave = () => {
		if (saved.has(home.homePlanId)) {
			const newSaved = new Set(saved);
			newSaved.delete(home.homePlanId);
			setSaved(newSaved);
		} else {
			const newSaved = new Set(saved);
			newSaved.add(home.homePlanId);
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

				{/*
					Making the entire card clickable would have the 
					combination feature trigger when clicking the save
					button. As such, I made it such that the bottom div
					does not trigger the combination feature. Persnally,
					I would wrap the combination event inside an actuall
					button rather than the card itself.
				*/}
				<ButtonBase 
					onClick={handleOpen} 
					className={classes.buttonBase}
				>
					<CardMedia
						component="img"
						height="140"
						image={home.image}
						alt="Cool Home, totally should buy"
					/>

					<CardContent>
						<Typography variant="h5" className={classes.title}>
							{home.name}
						</Typography>
						<Typography variant="body2" className={classes.info}>{`${home.numBeds} Beds - ${home.numBaths} bath - ${home.sqft} sqft`}</Typography>
						<div className={classes.tagContainer}>
							{home.tags.map(tag => (
								// Needed a div for margin for some reason
								<div style={{marginRight: 10}}>
									<Typography variant="body1" className={classes.tag}>{tag}</Typography>
								</div>
							))}
						</div>

						<div className={classes.description}>
							<Typography variant="body1" className={classes.description}>{home.description}</Typography>
						</div>
					</CardContent>
				</ButtonBase>


				<div className={classes.saveButton}>
					<Button 
						onClick={handleSave}
						variant="contained" 
						color={saved.has(home.homePlanId) ? "secondary" : "primary"}
						endIcon={<FavoriteIcon />}
						>Save</Button>
				</div>

			</Card>
			
			{/* This could probably be a single shared component with the card as a parameter */}
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
						Compatable Lots
          		</Typography>
					<Grid 
						container 
						spacing={3}
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						{lots.map(lot => {
							return (
								<Grid item key={lot.lotId}> 
									<LotCard 
										lot={lot} 
										saved={savedLots}
										setSaved={setSavedLots}
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

export default HomeCard;
