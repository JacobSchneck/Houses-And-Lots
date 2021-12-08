import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
	Container,
	Typography, 
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Drawer,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const navItems = [
	{
		text: 'Homes',
		path: '/homes',
	},
	{
		text: 'Lots',
		path: '/lots',
	},
];

const drawerWidth = 240;
const useStyles = makeStyles(theme => {
	return {
		root: {
			display: 'flex', // forces drawer to not cover up page content
			backgroundColor: "#f1f1f1"
		},
		drawer: {
			width: drawerWidth,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		page: {
			width: '100%',
			padding: '24', // normally would use theme but material ui is being finnicky
		},
		active: {
			backgroundColor: "#f2f2f2",
		},
	}
})

interface LayoutProps {
	children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const classes = useStyles();
	const navigate = useNavigate(); // changed from useHistory why!!!!
	const location = useLocation();


	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				anchor="left"
				classes={{ paper: classes.drawerPaper }}
			>
				{/* TODO: Add a highlight for the list item that corresponds to the page the user is on */}
				<List>
					{navItems.map(item => {
						console.log(location.pathname === item.path)
						return (
							<ListItem
								className={location.pathname == item.path ? classes.active : undefined}
								key={item.text}
								onClick={() => navigate(item.path)}
							>
								<ListItemText primary={item.text}/>
								{/* <ListItemText primary={location.pathname == item.path}/> */}
							</ListItem>	
						)
					})}
				</List>
			</Drawer>

			<div className={classes.page}>
				{children}
			</div>
		</div>
	)
}

export default Layout;