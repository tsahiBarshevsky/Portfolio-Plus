import React, { useEffect, useState } from 'react';
import { 
	Typography, FormControl, Input, Button, Snackbar, Divider, List, ListItem,
	AppBar, Toolbar, CssBaseline, IconButton, Drawer, Fab, CircularProgress,
	Grid, Avatar } from '@material-ui/core';
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
		height: '100vh',
		overflowY: 'scroll'
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
		marginTop: '65px'
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
	avatar: {
        width: theme.spacing(22),
        height: theme.spacing(22)
	},
	divider: {
        height: theme.spacing(.3),
        width: '285px',
        backgroundColor: 'black',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
    }
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
	const [url, setUrl] = useState('');

    useEffect(() =>
    {
		firebase.getAllUsers().then(setUsers);
		getImageURL();
    }, []);

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

	const handleImageChange = e =>
	{
		if (e.target.files[0])
		{
			try 
			{	
				if (e.target.files[0].size < 5000000) //less then 5mb
				{
					if (url !== '')
						deleteImage();
					firebase.uploadImage(e.target.files[0], firebase.getCurrentUsername());
					alert("Upload successfully");
				}
				else
					alert("Image's size is bigger than 5mb!");
			} 
			catch (error) 
			{
				console.log(error);
			}
		}
	}

	console.log("url: " + url);

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
                        <Typography align="center" variant="h4" gutterBottom>
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
                    <Divider className={classes.divider}/>
					<MuiThemeProvider theme={typographyTheme}>
                        <Typography align="center" variant="h4" gutterBottom>
                            {`Profile picture`}
                        </Typography>
                    </MuiThemeProvider>
					<Avatar src={url !== '' ? url : null} alt="Profile picture" className={classes.avatar} />
					<label htmlFor="upload-photo">
						<input
							accept="image/*"
							style={{ display: "none" }}
							id="upload-photo"
							name="upload-photo"
							type="file"
							onChange={handleImageChange}/>
						<Fab color="primary" size="small" component="span">
							<PhotoCameraOutlinedIcon />
						</Fab>
					</label>
					<Button onClick={deleteImage}>delete</Button>
					<Divider className={classes.divider}/>
					<MuiThemeProvider theme={typographyTheme}>
                        <Typography align="center" variant="h4" gutterBottom>
                            {`Personal link area`}
                        </Typography>
                    </MuiThemeProvider>
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

	function deleteImage()
	{
		firebase.deleteImage(url);
	}
	
	async function getImageURL()
	{
		if (firebase.getCurrentUsername())
		{
			var username = firebase.getCurrentUsername();
			firebase.storage.ref("Profile images").child(username).getDownloadURL().then(
				url => {setUrl(url);}
			);
		}
	}

    async function goToDashboard()
    {
        props.history.push('/dashboard');
    }

	async function logout() {
		await firebase.logout();
		props.history.push('/');
	}
}

export default withRouter(withStyles(styles)(Settings));