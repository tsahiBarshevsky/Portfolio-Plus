import React, { useEffect, useState } from 'react';
import { 
	Typography, FormControl, Input, Button, Snackbar, Divider, List, ListItem,
	AppBar, Toolbar, CssBaseline, IconButton, Drawer, Fab, CircularProgress,
	Grid } from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import firebase from '../firebase';
import { withRouter, Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProjectCard from '../ProjectCard';
import GenericPhoto from '../../images/person-circle-outline.svg';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

const drawerWidth = 240;
const styles = theme => ({
	root: 
	{
		backgroundColor: '#f5f5f5',
		display: 'flex',
		cursor: 'default'
	},
	appBar: 
	{
		transition: theme.transitions.create(['margin', 'width'], 
		{
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: 
	{
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], 
		{
			easing: theme.transitions.easing.easeOut,
		  	duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: 
	{
		marginRight: theme.spacing(2),
	},
	hide: 
	{
		display: 'none',
	},
	drawer: 
	{
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: 
	{
		width: drawerWidth,
	},
	drawerHeader: 
	{
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	main: 
	{
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', 
		{
		  	easing: theme.transitions.easing.sharp,
		  	duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	mainShift: 
	{
		transition: theme.transitions.create('margin', 
		{
		  	easing: theme.transitions.easing.easeOut,
		  	duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	content:
	{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'start',
		marginTop: '55px'
	},
	profileImage:
	{
		width: '200px',
		height: '200px',
		borderRadius: '50%'
	},
	submit: 
	{
		marginTop: theme.spacing(3),
	},
	input:
	{
		backgroundColor: 'rgba(255, 255, 255, 0.65)',
        height: '40px',
        borderRadius: '25px',
		fontFamily: 'Andika New Basic'
	},
	fab: 
	{
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
});

const typographyTheme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
		},
	}
});

function Settings(props) 
{
	const { classes } = props;
	const theme = useTheme();
    const [update, setUpdate] = useState(true);  
    const [users, setUsers] = useState([]);
	const [username, setUsername] = useState('');
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [error, setError] = useState('');
	const [openSuccess, setOpenSuccess] = useState('');

    useEffect(() =>
    {
		firebase.getAllUsers().then(setUsers);
    }, []);

	/*useEffect(() =>
	{
		if (firebase.getCurrentUsername())
			firebase.getCurrentUserQuote().then(setQuote);
	}, [firebase.getCurrentUsername(), firebase.getCurrentUserQuote()]);*/

	if (!firebase.getCurrentUsername()) {
		// not logged in
		//console.log('Please login first');
		props.history.replace('/login');
		return null;
	}

	const Alert = (props) =>
    {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
	};

	const closeSnackbar = () =>
	{
		setOpenError(false);
		setOpenSuccess(false);
	}

	const clearForm = () =>
	{
		
	}

	const handleDrawerOpen = () => 
	{
		setOpen(true);
	}
	
	const handleDrawerClose = () => 
	{
		setOpen(false);
	}

	return (
		<div className={classes.root}>
      		<CssBaseline />
      		<AppBar
        		position="fixed"
        		className={clsx(classes.appBar, {
          			[classes.appBarShift]: open,
        		})} >
        		<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}>
						<MenuIcon />
					</IconButton>
					<MuiThemeProvider theme={typographyTheme}>
						<Typography variant="h6">
                            Settings panel
						</Typography>
					</MuiThemeProvider>
        		</Toolbar>
      		</AppBar>
      		<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
        		<Divider />
				<List>
					{['Dashboard', 'Settings'].map((text, index) => (
						<ListItem button key={text} onClick={index % 2 === 0 ? goToDashboard : handleDrawerClose}>
							<ListItemIcon>{index % 2 === 0 ? <DashboardIcon /> : <SettingsIcon />}</ListItemIcon>
							<MuiThemeProvider theme={typographyTheme}>
								<Typography variant="h6">
									{text}
								</Typography>
							</MuiThemeProvider>
						</ListItem>
					))}
				</List>
        		<Divider />
				<List>
					<ListItem button onClick={logout}>
						<ListItemIcon><ExitToAppIcon /></ListItemIcon>
						<MuiThemeProvider theme={typographyTheme}>
							<Typography variant="h6">
								Logout
							</Typography>
						</MuiThemeProvider>
					</ListItem>
				</List>
      		</Drawer>
      		<main
				className={clsx(classes.main, 
				{
          			[classes.mainShift]: open,
        		})}>
				<div className={classes.content}>
                    <MuiThemeProvider theme={typographyTheme}>
                        <Typography align="center" variant="h5">
                            {`Account details`}
                        </Typography>
                    </MuiThemeProvider>
                    <MuiThemeProvider theme={typographyTheme}>
                        <Typography align="center" variant="h6">
                            {`Username: ${firebase.getCurrentUsername()}`}
                        </Typography>
                        <Typography align="center" variant="h6">
                            {`Email: ${firebase.getCurrentUsernameEmail()}`}
                        </Typography>
                    </MuiThemeProvider>
                    <Divider />
                    <MuiThemeProvider theme={typographyTheme}>
                        <Typography align="center" variant="h5">
                            {`Change username`}
                        </Typography>
                    </MuiThemeProvider>
                    <FormControl margin="normal" required fullWidth>
                        <Input id="username" name="username"
                            inputProps={{min: 0, style: { marginLeft: '20px' }}} 
                            disableUnderline 
                            placeholder="New username.."
                            className={classes.input}
                            autoComplete="off" 
                            autoFocus value={username} 
                            onChange={e => setUsername(e.target.value)} />
                    </FormControl>
                    <Button onClick={updateUsername}>Update</Button>
				</div>
				<Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity="success">
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="subtitle1">
								{`Project added successfully!`}
							</Typography>
						</MuiThemeProvider>
					</Alert>
				</Snackbar>
				<Snackbar open={openError} autoHideDuration={3500} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity="error">
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="subtitle1">
								{error}
							</Typography>
						</MuiThemeProvider>
					</Alert>
				</Snackbar>
      		</main>
    	</div>
    );
    
    async function goToDashboard()
    {
        props.history.push('/dashboard');
    }

    async function updateUsername()
    {
        var fault = false;
		//check username availability
		for (let index = 0; index < users.length; index++) 
		{
			if (username === users[index].username)
				fault = true;		
		}
        if (!fault) //username available
		{
			try 
			{
                const oldUsername = firebase.getCurrentUsername();
                await firebase.updateUsername(username);
                await firebase.addUserToList(username); //add to users' list
                await firebase.deleteUserFromList(oldUsername); //delete old name from users' list
			} 
			catch(error) 
			{
				setOpenError(true);
				setError(error.message);
			}
		}
		else //username unavailable
		{
			setOpenError(true);
			setError("Username is already taken. Please choose other username.")
		}
    }

	async function logout() {
		await firebase.logout();
		props.history.push('/');
	}
}

export default withRouter(withStyles(styles)(Settings));