import React, { useEffect, useState } from 'react';
import { 
	Typography, FormControl, Input, Button, Snackbar, Divider, List, ListItem,
	AppBar, Toolbar, CssBaseline, IconButton, Drawer, Fab,
	Grid, Tooltip, Fade} from '@material-ui/core';
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
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GridContainer, Container, PulseBubble1, PulseBubble2,
	PulseBubble3, PulseContainer, ButtonsWrapper, TableWrapper } from './DashboardElements';
import { Helmet } from 'react-helmet';
import { grey, blueGrey, red } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DashboradCard from './DashboradCard';
import ProjectsTable from '../ProjectsTable';

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
		alignItems: 'center',
		marginTop: '65px'
	},
	submit: 
	{
		color: '#263238',
		width: '100px',
		height: '40px',
		fontSize: '16px',
		fontWeight: '600',
		border: '2px solid #263238',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		marginRight: theme.spacing(1),
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#263238',
			transition: 'all 0.2s ease-in'
		}
	},
	addLink: 
	{
		color: '#263238',
		width: '100px',
		height: '40px',
		fontSize: '16px',
		fontWeight: '600',
		border: '2px solid #263238',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		marginLeft: theme.spacing(1),
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#263238',
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
		border: '2px solid #263238',
		backgroundColor: '#263238',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		marginLeft: theme.spacing(1),
		'&:hover':
		{
			color: '#263238',
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
		border: '2px solid #263238',
		backgroundColor: '#263238',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		marginLeft: theme.spacing(1),
		'&:hover':
		{
			color: '#263238',
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
		zIndex: '20',
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
	tooltip: {fontSize: '15px', textAlign: 'center', lineHeight: 1.2}
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
		},
		h6:
		{
			lineHeight: 1.1
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
	const [links, setLinks] = useState([{}]);
	const [video, setVideo] = useState('');
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [openSuccess, setOpenSuccess] = useState('');
	const [openDialog, setOpenDialog] = useState('');
	const [projects, setProjects] = useState([]);
	const [isLoad, setIsLoad] = useState(false);
	const [date, setDate] = useState('');
	const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
		defaultMatches: true
	});

	const dialogBackground = {backgroundColor: '#f5f5f5'};

    useEffect(() =>
    {
		if (update)
		{
			firebase.getAllProjects(firebase.getCurrentUsername()).then(setProjects);
			firebase.getLastUpdate(firebase.getCurrentUsername()).then(setDate);
			setUpdate(false);
		}
	}, [firebase.getAllProjects()]);

	if (projects && date && !isLoad)
		setIsLoad(true);
	
	//not logged in - redirect to login page
	if (!firebase.getCurrentUsername()) {
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
		else
			if (video.trim() === '')
				return null;
		return false;
	}

	const checkURL = (url) =>
	{
		if (typeof url === 'object')
			return false;
		const reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
		if (reg.test(url.trim()))
			return true;
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
		setLinks([...links, {}]);
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
		setLinks([{}]);
		setVideo('');
		Array.from(document.querySelectorAll("Input")).forEach(
			input => (input.id === "links" ? input.value = "" : null)
		);
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

	const countTypes = (iterable) => 
    {
        return new Set(iterable.map(a => a.type)).size;
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
						<Tooltip title={<p className={classes.tooltip}>Add new project</p>} 
							placement="left" arrow
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
							<Typography align="center" variant="h6">
								{`Here are information and stats about your account:`}
							</Typography>
						</MuiThemeProvider>
						<Container>
							<GridContainer>
								<Grid spacing={isMobile ? 2 : 7}
									container
									direction="row"
									justify="center"
									alignItems="center">
										<Grid item>
											<DashboradCard title="Number of projects" content={projects.length} />
										</Grid>
										<Grid item>
											<DashboradCard title="Number of types" content={countTypes(projects)} />
										</Grid>
										<Grid item>
											<DashboradCard title="Last update" content={date} />
										</Grid>
								</Grid>
							</GridContainer>
						</Container>
						{projects.length >= 1 ?
						<>
							<MuiThemeProvider theme={typographyTheme}>
								<Typography align="center" variant="h6" gutterBottom>
									{`Your projects:`}
								</Typography>
							</MuiThemeProvider>
							<TableWrapper>
								<ProjectsTable projects={projects}
									name={firebase.getCurrentUsername()}
									setUpdate={setUpdate}/>
							</TableWrapper>
						</> : null}
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
								<FormControl margin="normal" fullWidth>
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
								<FormControl margin="normal" fullWidth>
									<Input id="type" name="type"
										inputProps={{min: 0, style: { marginLeft: '20px' }}}
										disableUnderline 
										placeholder="Project type.."
										className={classes.input}
										autoComplete="off" 
										value={type} 
										onChange={e => setType(e.target.value)} />
								</FormControl>
								<FormControl margin="normal" fullWidth>
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
								{500 - description.length <= 10 && description.length !== 500 ? 
								<MuiThemeProvider theme={typographyTheme}>
									<Typography variant="subtitle1">
										{`${500-description.length} characters left until the limit of 500`}
									</Typography>
								</MuiThemeProvider>
								:
								[(description.length === 500 ? 
								<MuiThemeProvider theme={typographyTheme}>
									<Typography variant="subtitle1">
										{`You've exceeded the maximum character limit`}
									</Typography>
								</MuiThemeProvider>	
								: null)]}
								<FormControl margin="normal" fullWidth>
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
											margin="normal" fullWidth>
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
												{links.length - 1 === i && links.length <= 2 && <Button 
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
								{success}
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
			if (result || result === null)
			{
				if (title.trim() !== '' && type.trim() !== '' && description.trim() !== '')
				{
					//check if there are no links
					if (links.length === 1 && (typeof links[0] === "object" || links[0] === ""))
					{
						await firebase.addProject(title.trim(), type.trim(), description.trim(), null, result);
						setOpenDialog(false);
						setOpenSuccess(true);
						setSuccess(`${title.trim()} has been successfully added`);
						setUpdate(true);
						clearForm();
					}
					else
					{
						var fault = false;
						links.map(x => !checkURL(x) ? fault = true : null)
						if (fault)
						{
							setError("Invalid URL. If you left any of the fields empty, please remove it");
							setOpenError(true);
						}
						else
						{
							await firebase.addProject(title.trim(), type.trim(), description.trim(), links, result);
							setOpenDialog(false);
							setOpenSuccess(true);
							setSuccess(`${title.trim()} has been successfully added`);
							setUpdate(true);
							clearForm();
						}
						//check if any input left empty, if so, delete {} from array
						/*links.map((x, i) => {return typeof x === 'object' || x.trim() === '' ? links.splice(i, 1) : null});
						if (links.length === 0)
							await firebase.addProject(title.trim(), type.trim(), description.trim(), null, result);
						else
						{
							if (links.length === 1 && links[0].replace(/\s/g, '').length === 0)
								await firebase.addProject(title.trim(), type.trim(), description.trim(), null, result);
							else
								await firebase.addProject(title.trim(), type.trim(), description.trim(), links, result);
						}*/
					}
					
				}
				else
				{
					setError("One of the fields has left blank");
					setOpenError(true);
				}
			}
			else
			{
				setError("Invalid youtube URL");
				setOpenError(true);
			}
		}
		catch(error)
		{
			setError("An unexpected error occurred");
			setOpenError(true);
			console.log(error.message);
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