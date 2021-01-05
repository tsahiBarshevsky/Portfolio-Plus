import React, { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
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
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import { ImagePanel, ButtonsPanel, Wrapper, PreviewContianer, PersonalPage } from './SettingsElement';
import { red } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import ThemeCard from '../ThemeCard';

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
	uploadButton: 
	{
		width: '170px',
		height: '43px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#ff4040',
		fontSize: '15px',
		fontWeight: '600',
		border: '2px solid #ff4040',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		textTransform: 'capitalize',
		cursor: 'pointer',
		margin: theme.spacing(1),
		transition: 'all 0.2s ease-out',
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#ff4040',
			transition: 'all 0.2s ease-in'
		}
	},
	deleteButton: 
	{
		width: '170px',
		height: '43px',
		color: 'white',
		fontSize: '15px',
		fontWeight: '600',
		border: '2px solid #ff4040',
		backgroundColor: '#ff4040',
		borderRadius: '25px',
		textTransform: 'capitalize',
		margin: theme.spacing(1),
		'&:hover':
		{
			color: '#ff4040',
			backgroundColor: 'transparent',
		}
	},
	fab: 
	{
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	avatar: {
        width: theme.spacing(18),
		height: theme.spacing(18),
		marginRight: theme.spacing(1.5),
		marginBottom: theme.spacing(1)
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
		subtitle2:
		{
			color: red[900]
		}
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
	const [message, setMessage] = useState('');
	const [url, setUrl] = useState('');
	const [progress, setProgress] = useState(0);

	const themes = ['default', 'bg1', 'bg2', 'bg3', 'bg4', 'bg5'];
	const [selectedTheme, setSelectedTheme] = useState('');

    useEffect(() =>
    {
		if (update)
		{
			getUserTheme();
			getImageURL();
			setUpdate(false);
		}
    }, [getImageURL, getUserTheme]);

	if (!firebase.getCurrentUsername()) {
		// not logged in
		//console.log('Please login first');
		props.history.replace('/login');
		return null;
	}

	if (progress === 100)
	{
		setOpenSuccess(true);
		setMessage("Image uploaded successfully!");
		getImageURL();
		setProgress(0);
		setUpdate(true);
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

	const handleOpen = () => 
	{
		setOpenSuccess(true);
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
						deleteImage(false);
					const uploadTask = firebase.storage.ref(`Profile images/${firebase.getCurrentUsername()}`).put(e.target.files[0]);
					uploadTask.on(
						"state_changed", 
						snapshot => {
							const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
							setProgress(progress);
						}, 
						error => {console.log(error);});
						//firebase.uploadImage(e.target.files[0], firebase.getCurrentUsername());
				}
				else
				{
					setError("Image's size is bigger than 5mb!");
					setOpenError(true);
				}
			} 
			catch (error) 
			{
				setError(error.message);
				setOpenError(true);
			}
		}
	}

	return (
		<div className={classes.root}>
			<Helmet><title>{`Portfolio Plus | @${firebase.getCurrentUsername()} settings`}</title></Helmet>
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
                        <Typography align="center" variant="h6" gutterBottom>
                            {`Email: ${firebase.getCurrentUsernameEmail()}`}
                        </Typography>
                    </MuiThemeProvider>
					<PersonalPage target="_blank" to={`/${firebase.getCurrentUsername()}`}>Go to your personal page</PersonalPage>
                    <Divider className={classes.divider}/>
					<MuiThemeProvider theme={typographyTheme}>
                        <Typography align="center" variant="h4" gutterBottom>
                            {`Appearance`}
                        </Typography>
                    </MuiThemeProvider>
					<MuiThemeProvider theme={typographyTheme}>
                        <Typography align="center" variant="h6" gutterBottom>
                            {`Profile image`}
                        </Typography>
                    </MuiThemeProvider>
					<Wrapper>
						<ImagePanel>
							<Avatar src={url !== '' ? url : null} alt="Profile picture" className={classes.avatar} />
							<ButtonsPanel>
								<label htmlFor="upload-photo" className={classes.uploadButton}>
									upload an image
								</label>
								<input
									accept="image/*"
									style={{ display: "none" }}
									id="upload-photo"
									name="upload-photo"
									type="file"
									onChange={handleImageChange}/>
								<Button className={classes.deleteButton} onClick={() => deleteImage(true)}>delete</Button>
							</ButtonsPanel>
						</ImagePanel>
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="subtitle2" gutterBottom>
								{`Note: Picture should be less than 5mb and 1:1 ratio is recomended.`}
							</Typography>
						</MuiThemeProvider>
						{progress > 0 ? 
						<ProgressBar width="250px"
							completed={progress} 
							bgcolor="#ff4040" 
							labelColor="#000000" 
							labelAlignment="center" /> : null}
					</Wrapper>
					<MuiThemeProvider theme={typographyTheme}>
                        <Typography align="center" variant="h6" gutterBottom>
                            {`Themes`}
                        </Typography>
                    </MuiThemeProvider>
					<Grid 
						spacing={5} container direction="row"
						justify="flex-start" alignItems="center">
						{themes.map((theme, index) =>
							<Grid item>
								<ThemeCard 
								theme={theme}
								username={firebase.getCurrentUsername()} 
								selectedTheme={selectedTheme}
								setSelectedTheme={setSelectedTheme}
								key={index} />
							</Grid>
						)}
					</Grid>
				</div>
				<Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity="success">
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="subtitle1">
								{message}
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

	function deleteImage(showMessage)
	{
		if (url !== '')
		{
			firebase.deleteImage(url);
			if (showMessage)
			{
				setOpenSuccess(true);
				setMessage("Image deleted successfully!")
				setUrl('');
			}
		}
	}

	async function getUserTheme()
	{
		await firebase.getUserTheme(firebase.getCurrentUsername()).then(setSelectedTheme);
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