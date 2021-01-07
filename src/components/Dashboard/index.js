import React, { useEffect, useState } from 'react';
import { 
	Typography, FormControl, Input, Button, Snackbar, Divider, List, ListItem,
	AppBar, Toolbar, CssBaseline, IconButton, Drawer, Fab, CircularProgress,
	Grid, Tooltip, Fade} from '@material-ui/core';
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
import { GridContainer, Container, PulseBubble1, PulseBubble2,
	PulseBubble3, PulseContainer, ButtonsWrapper } from './DashboardElements';
import { Helmet } from 'react-helmet';
import { grey, blueGrey, red } from '@material-ui/core/colors';

const drawerWidth = 240;
const styles = theme => ({
	root: 
	{
		backgroundColor: '#f5f5f5',
		display: 'flex',
		cursor: 'default',
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
		alignItems: 'center',
		marginTop: '65px'
	},
	submit: 
	{
		color: '#ff4040',
		width: '100px',
		height: '40px',
		fontSize: '16px',
		fontWeight: '600',
		border: '2px solid #ff4040',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		marginRight: theme.spacing(1),
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#ff4040',
			transition: 'all 0.2s ease-in'
		}
	},
	addLink: 
	{
		color: '#ff4040',
		width: '100px',
		height: '40px',
		fontSize: '16px',
		fontWeight: '600',
		border: '2px solid #ff4040',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		marginLeft: theme.spacing(1),
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#ff4040',
			transition: 'all 0.2s ease-in'
		}
	},
	deleteLink: 
	{
		color: 'white',
		width: '100px',
		height: '40px',
		fontSize: '16px',
		fontWeight: '600',
		border: '2px solid #ff4040',
		backgroundColor: '#ff4040',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		marginLeft: theme.spacing(1),
		'&:hover':
		{
			color: '#ff4040',
			backgroundColor: 'transparent',
			transition: 'all 0.2s ease-in'
		}
	},
	clear:
	{
		color: 'white',
		width: '100px',
		height: '40px',
		fontSize: '16px',
		fontWeight: '600',
		border: '2px solid #ff4040',
		backgroundColor: '#ff4040',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		marginLeft: theme.spacing(1),
		'&:hover':
		{
			color: '#ff4040',
			backgroundColor: 'white',
			transition: 'all 0.2s ease-in'
		}
	},
	input:
	{
		backgroundColor: 'white',
		border: '1px solid black',
        height: '40px',
        borderRadius: '25px',
		fontFamily: 'Andika New Basic',
	},
	descriptionInput:
	{
		backgroundColor: 'white',
		border: '1px solid black',
        borderRadius: '25px',
		fontFamily: 'Andika New Basic',
	},
	fab: 
	{
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		color: blueGrey[50],
		backgroundColor: blueGrey[900],
		margin: theme.spacing(0.4),
		"&:hover":
		{
			backgroundColor: blueGrey[800],
		}
	},
});

const typographyTheme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
		},
		subtitle1:
		{
			fontSize: '12px',
			color: red[900]
		}
	}
});

function Dashboard(props) 
{
	const getGreeting = () => 
	{
		const now = new Date().getHours();
		if (now >= 22) return "Good night";
		if (now >= 17) return "Good evening";
		if (now >= 12) return "Good afternoon";
		if (now >= 6) return "Good morning";
	}

	const greet = getGreeting();
	const { classes } = props;
	const theme = useTheme();
	const [update, setUpdate] = useState(true);  
	const [title, setTitle] = useState('');
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [links, setLinks] = useState([{link: ''}]);
	const [video, setVideo] = useState('');
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [error, setError] = useState('');
	const [openSuccess, setOpenSuccess] = useState('');
	const [openDialog, setOpenDialog] = useState('');
	const [projects, setProjects] = useState([]);
	const [image, setImage] = useState(null);
	const [isLoad, setIsLoad] = useState(false);
	const dialogBackground = {backgroundColor: '#f5f5f5'};

    useEffect(() =>
    {
		setTimeout(() => {
			setIsLoad(true);
		}, 1000);
		if (update)
		{
			firebase.getAllProjects(firebase.getCurrentUsername()).then(setProjects);
			setUpdate(false);
		}
	}, [firebase.getAllProjects()]);
	
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

	const checkVideoURL = () =>
	{
		const reg = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
		if (reg.test(video.trim()))
		{
			if (video.split('v=').pop().split('&')[0] !== video)
				return `https://www.youtube.com/embed/${video.split('v=').pop().split('&')[0]}`;
			return `https://www.youtube.com/embed/${video.split('/').pop()}`;
		}
		return false;
	}

	const handleInputChange = (e, index) => 
	{
		const { value } = e.target;
		const list = [...links];
		list[index] = value;
		setLinks(list);
	}

	const handleRemoveClick = index => {
		const list = [...links];
		list.splice(index, 1);
		setLinks(list);
	}

	const handleAddClick = () => {
		setLinks([...links, { link: '' }]);
	};

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
		setTitle('');
		setType('');
		setDescription('');
		setLinks([{link: ''}]);
		setVideo('');
	}

	const handleDrawerOpen = () => 
	{
		setOpen(true);
	}
	
	const handleDrawerClose = () => 
	{
		setOpen(false);
	}

	const handleClickOpen = () => 
	{
		setOpenDialog(true);
	}
	
	const handleClickClose = () =>
	{
		setOpenDialog(false);
	}

	return (
		<div className={classes.root}>
			<Helmet><title>{`Portfolio Plus | @${firebase.getCurrentUsername()} dashboard`}</title></Helmet>
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
							Dashboard panel
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
						<ListItem button key={text} onClick={index % 2 === 0 ? handleDrawerClose : goToSettings}>
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
					{isLoad ? 
					<>
						<Tooltip title="Add new project" 
							placement="left"
							TransitionComponent={Fade} 
							TransitionProps={{ timeout: 400 }}
							enterDelay={500}>
							<Fab className={classes.fab} color="primary" aria-label="add" onClick={handleClickOpen}>
								<AddIcon />
							</Fab>
						</Tooltip>
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="h4" gutterBottom>
								{`${greet}, ${firebase.getCurrentUsername()}!`}
							</Typography>
						</MuiThemeProvider>
						{projects.length >= 1 ?
						<Container>
							<MuiThemeProvider theme={typographyTheme}>
								<Typography align="center" variant="h5" gutterBottom>
									{`So far, you've added ${projects.length > 1 ? `${projects.length} projects` : `one project`}`}
								</Typography>
							</MuiThemeProvider>
							<GridContainer>
								<Grid spacing={4}
										container
										direction="row"
										justify="center"
										alignItems="center"
										alignContent="center"
									>
									{projects.map((project, index) =>
									<Grid item lg={3} xl={3} key={index}>
										<ProjectCard 
											name={firebase.getCurrentUsername()}
											title={project.title}
											setUpdate={setUpdate} />
									</Grid>
									)}
								</Grid>
							</GridContainer>
						</Container>
						: 
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="h5">
								{`You haven't added any project yet. Don't worry, you can do it anytime!`}
							</Typography>
						</MuiThemeProvider>}
					</> 
					: 
					<PulseContainer>
						<PulseBubble1 />
						<PulseBubble2 />
						<PulseBubble3 />
					</PulseContainer>}
				</div>
				
				<Dialog
					open={openDialog}
					onClose={handleClickClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					style={{cursor: "default"}}>
						<DialogTitle style={dialogBackground}>
							<MuiThemeProvider theme={typographyTheme}>
								<Typography variant="h5">
									{`Adding new project`}
								</Typography>
							</MuiThemeProvider>
						</DialogTitle>
						<DialogContent style={dialogBackground}>
							<form onSubmit={e => e.preventDefault() && false }>
								<FormControl margin="normal" required fullWidth>
									<Input id="title" name="title"
										inputProps={{min: 0, style: { marginLeft: '20px' }}} 
										disableUnderline 
										placeholder="Project title.."
										className={classes.input}
										autoComplete="off" 
										autoFocus value={title} 
										onChange={e => setTitle(e.target.value)} />
								</FormControl>
								{title !== '' ?
								<MuiThemeProvider theme={typographyTheme}>
								<Typography variant="subtitle1">
										{`Note: the title is unchangeable after adding a project`}
									</Typography>
								</MuiThemeProvider> : null}
								<FormControl margin="normal" required fullWidth>
									<Input id="type" name="type"
										inputProps={{min: 0, style: { marginLeft: '20px' }}}
										disableUnderline 
										placeholder="Project type.."
										className={classes.input}
										autoComplete="off" 
										value={type} 
										onChange={e => setType(e.target.value)} />
								</FormControl>
								<FormControl margin="normal" required fullWidth>
									<Input id="description" name="description"
										multiline rows={5} rowsMax={5}
										inputProps={{min: 0, style: { marginLeft: '20px' }, maxLength: 500}}
										disableUnderline 
										placeholder="Project description.."
										className={classes.descriptionInput}
										autoComplete="off" 
										value={description} 
										onChange={e => setDescription(e.target.value)} />
								</FormControl>
								<FormControl margin="normal" required fullWidth>
									<Input id="video" name="video"
										inputProps={{min: 0, style: { marginLeft: '20px' }}}
										disableUnderline 
										placeholder="Youtube video URL.."
										className={classes.input}
										autoComplete="off" 
										value={video} 
										onChange={e => setVideo(e.target.value)} />
								</FormControl>
								{links.map((x, i) =>
								{
									return(
										<FormControl style={{display: 'flex', flexDirection: 'row'}}
											margin="normal" required fullWidth>
											<Input id="links" name="links"
												inputProps={{min: 0, style: { marginLeft: '20px' }}}
												disableUnderline 
												placeholder={`Link #${i+1}`}
												className={classes.input}
												autoComplete="off" 
												value={x.links} 
												fullWidth
												onChange={e => handleInputChange(e, i)} />
											<div style={{display: 'flex', flexDirection: 'row'}}>
												{links.length !== 1 && <Button
												onClick={() => handleRemoveClick(i)}
												className={classes.deleteLink}>Remove</Button>}
												{links.length - 1 === i && <Button 
												onClick={handleAddClick}
												className={classes.addLink}>Add</Button>}
											</div>
										</FormControl>
									);
								})}
								<ButtonsWrapper>
									<Button type="submit" onClick={addProject} className={classes.submit}>
										Add
									</Button>
									<Button onClick={clearForm} className={classes.clear}>
										Clear
									</Button>
								</ButtonsWrapper>
							</form>
						</DialogContent>
				</Dialog>
				<Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity="success">
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="subtitle2">
								{`Project added successfully!`}
							</Typography>
						</MuiThemeProvider>
					</Alert>
				</Snackbar>
				<Snackbar open={openError} autoHideDuration={3500} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity="error">
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="subtitle2">
								{error}
							</Typography>
						</MuiThemeProvider>
					</Alert>
				</Snackbar>
      		</main>
    	</div>
	);

	async function addProject()
	{
		try
		{
			const result = checkVideoURL();
			if (result)
			{
				await firebase.addProject(title, type, description, links, result);
				setOpenDialog(false);
				setOpenSuccess(true);
				setUpdate(true);
				clearForm();
			}
			else
			{
				setError("Invalid youtube URL");
				setOpenError(true);
			}
		}
		catch(error)
		{
			setError(error.message);
			setOpenError(true);
		}
	}

	async function goToSettings()
	{
		props.history.push('/settings');
	}

	async function logout() {
		await firebase.logout();
		props.history.push('/');
	}
}

export default withRouter(withStyles(styles)(Dashboard));