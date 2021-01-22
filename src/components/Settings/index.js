import React, { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { 
	Typography, FormControl, Input, Button, Snackbar, Divider, List, ListItem,
	AppBar, Toolbar, CssBaseline, IconButton, Drawer, 
	Grid, Avatar, DialogActions } from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
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
import { ImagePanel, ButtonsPanel, Wrapper, PersonalPage, Warning, WarningWrapper } from './SettingsElement';
import { grey, red } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import ThemeCard from '../ThemeCard';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
		backgroundColor: grey[900],
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
		overflowY: 'scroll',
		'&::-webkit-scrollbar':
		{
			width: '0px', height: '0px'
		}
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
	input:
	{
		backgroundColor: 'white',
		border: '1px solid black',
		height: '40px',
		width: '300px',
        borderRadius: '25px',
		fontFamily: 'Andika New Basic',
	},
	updateButton:
	{
		width: '170px',
		height: '43px',
		color: '#ff4040',
		fontSize: '15px',
		fontWeight: '600',
		border: '2px solid #ff4040',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		marginTop: theme.spacing(1),
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#ff4040',
			transition: 'all 0.2s ease-in'
		}
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
	deleteAccountButton:
	{
		width: '170px',
		height: '43px',
		color: 'white',
		fontSize: '15px',
		fontWeight: '600',
		border: '2px solid #d50000',
		backgroundColor: '#d50000',
		borderRadius: '25px',
		marginTop: theme.spacing(1),
		textTransform: 'capitalize',
		'&:hover':
		{
			color: red['A700'],
			backgroundColor: 'transparent',
		}
	},
	dialogButton:
	{
		color: '#263238',
		width: '85px',
		height: '40px',
		fontSize: '16px',
		fontWeight: '600',
		border: '2px solid #263238',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#263238',
			transition: 'all 0.2s ease-in'
		}
	},
	deleteButtonDialog: 
	{
		width: '85px',
		color: 'white',
		fontSize: '15px',
		fontWeight: '600',
		border: '2px solid #263238',
		backgroundColor: '#263238',
		borderRadius: '25px',
		textTransform: 'capitalize',
		margin: theme.spacing(1),
		'&:hover':
		{
			color: '#263238',
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
		marginBottom: theme.spacing(3),
		[theme.breakpoints.down('xs')]:
		{
			width: '100%'
		}
    }
});

const typographyTheme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Andika New Basic", sans-serif` },
		subtitle2: { color: red[900] },
		h5: { paddingTop: '30px' }
	}
});

const messagesTheme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Andika New Basic", sans-serif` },
	}
});

const warningTheme = createMuiTheme({
	typography:
	{
		allVariants: 
		{ 
			fontFamily: `"Andika New Basic", sans-serif`, 
			color: red['A700'],
		}
	}
})

function Settings(props) 
{
	const { classes } = props;
	const theme = useTheme();
    const [update, setUpdate] = useState(true);  
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [error, setError] = useState('');
	const [openSuccess, setOpenSuccess] = useState('');
	const [message, setMessage] = useState('');
	const [url, setUrl] = useState('');
	const [progress, setProgress] = useState(0);
	const [profession, setProfession] = useState('');
	const [newProfession, setNewProfession] = useState('');
	const [openDialog, setOpenDialog] = useState(false);

	const themes = ['default', 'bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7'];
	const [selectedTheme, setSelectedTheme] = useState('');
	const dialogBackground = {backgroundColor: '#f5f5f5'};

    useEffect(() =>
    {
		if (update)
		{
			getUserTheme();
			getImageURL();
			setUpdate(false);
			firebase.getProfession(firebase.getCurrentUsername()).then(setProfession);
		}
    }, [getImageURL, getUserTheme, firebase.getProfession]);

	//not logged in - redirect to login page
	if (!firebase.getCurrentUsername()) {
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

	const handleDrawerOpen = () => 
	{
		setOpen(true);
	}
	
	const handleDrawerClose = () => 
	{
		setOpen(false);
	}

	const handleOpenDialog = () =>
	{
		setOpenDialog(true);
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

	const handleClose = () =>
	{
		setOpen(false);
        setOpenDialog(false);
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
						<Typography variant="h6">
                            {`Link to your page: `}
							<PersonalPage target="_blank" to={`/${firebase.getCurrentUsername()}`}>{`${window.location.origin.toString()}/${firebase.getCurrentUsername()}`}</PersonalPage>
                        </Typography>
						<Typography align="center" variant="h5" gutterBottom>
                            {`Change profession `}
                        </Typography>
						<Typography align="center" variant="h6" gutterBottom>
                            {`Current profession: ${profession}`}
                        </Typography>
                    </MuiThemeProvider>
					<FormControl margin="normal" fullWidth>
						<Input id="profession" name="profession"
							inputProps={{min: 0, style: { marginLeft: '20px' }, maxLength: 500}}
							disableUnderline 
							placeholder="New profession.."
							className={classes.input}
							autoComplete="off" 
							value={newProfession} 
							onChange={e => setNewProfession(e.target.value)} />
					</FormControl>
					<Button 
						onClick={updateProfession}
						className={classes.updateButton}>
							update
					</Button>
					<WarningWrapper>
						<MuiThemeProvider theme={warningTheme}>
							<Typography align="center" variant="h5" gutterBottom>
								{`Delete account`}
							</Typography>
						</MuiThemeProvider>
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="h6">
								Once you delete your account, there's no going back.
							</Typography>
							<Typography align="center" variant="h6">
								All of your data will be deleted. Please be certain!
							</Typography>
						</MuiThemeProvider>
						<Button className={classes.deleteAccountButton} onClick={handleOpenDialog}>Delete account</Button>
					</WarningWrapper>
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
							<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
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
				<Dialog
					open={openDialog}
					onClose={handleClose}
					style={{cursor: "default", borderRadius: '25px'}}>
						<DialogTitle style={dialogBackground}>
							<div style={{display: 'flex', flexDirection: 'row'}}>
								<Warning style={{fontSize: '30px'}} />
								<MuiThemeProvider theme={messagesTheme}>
									<Typography component="h1" variant="h5">
										{`Delete account`}
									</Typography>
								</MuiThemeProvider>
							</div>
						</DialogTitle>
						<DialogContent style={dialogBackground}>
							<MuiThemeProvider theme={typographyTheme}>
								<Typography variant="h6" gutterBottom>
									{`Hey ${firebase.getCurrentUsername()}, 
									wait! Are you sure you want to delete your account?
									This is a permanent action.`}
								</Typography>
							</MuiThemeProvider>
						</DialogContent>
						<DialogActions style={dialogBackground}>
							<Button onClick={handleClose} className={classes.dialogButton}>Cancel</Button>
							<Button onClick={deleteAccount} className={classes.deleteButtonDialog}>Delete</Button>
						</DialogActions>
				</Dialog>
				<Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity="success">
						<MuiThemeProvider theme={messagesTheme}>
							<Typography align="center" variant="subtitle2">
								{message}
							</Typography>
						</MuiThemeProvider>
					</Alert>
				</Snackbar>
				<Snackbar open={openError} autoHideDuration={3500} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity="error">
						<MuiThemeProvider theme={messagesTheme}>
							<Typography align="center" variant="subtitle2">
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
				setMessage("Image deleted successfully!");
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

	async function updateProfession()
	{
		try 
		{
			if (newProfession !== '')
			{
				await firebase.updateProfession(firebase.getCurrentUsername(), newProfession);
				setMessage(`Profession has been successfully changed to ${newProfession}`);
				setOpenSuccess(true);
				setUpdate(true);
				setNewProfession('');
			}
			else
			{
				setError("Profession field has left blank");
				setOpenError(true);
			}
		} 
		catch (error) 
		{
			setError("An unexpected error occurred");
			setOpenError(true);
			console.log(error.message);
		}
	}

	async function deleteAccount()
	{
		try 
		{
			await firebase.deleteAccount();
			handleClose();
			props.history.push('/');
		} 
		catch (error)
		{
			setError("An unexpected error occurred");
			setOpenError(true);
			console.log(error.message);
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