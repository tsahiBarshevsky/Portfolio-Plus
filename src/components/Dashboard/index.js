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
		alignItems: 'center',
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
	const [url, setUrl] = useState('');

    useEffect(() =>
    {
		getImageURL();
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

	const handleImageChange = e =>
	{
		if (e.target.files[0])
			setImage(e.target.files[0]);
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
						<ListItem button key={text}>
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
					<img className={classes.profileImage}
						src={url !== '' ? url : GenericPhoto} alt="Profile image" />
					<label htmlFor="upload-photo">
						<input
							accept="image/*"
							style={{ display: "none" }}
							id="upload-photo"
							name="upload-photo"
							type="file"
							onChange={handleImageChange}/>
						<Fab color="primary" size="small" component="span" aria-label="add">
							<PhotoCameraOutlinedIcon />
						</Fab>
					</label>
					<Button onClick={uploadImage}>Upload</Button>
					<MuiThemeProvider theme={typographyTheme}>
						<Typography align="center" variant="h5">
							{`${greet}, ${firebase.getCurrentUsername()}!`}
						</Typography>
					</MuiThemeProvider>
					<MuiThemeProvider theme={typographyTheme}>
						<Typography align="center" variant="h5">
							<Link target="_blank" to={`/${firebase.getCurrentUsername()}`}>Your link</Link>
						</Typography>
					</MuiThemeProvider>
					{projects.length >= 1 ?
					<Grid 
						container spacing={3} direction="row"
						justify="center" alignItems="center">
						{projects.map((project, index) =>
						<Grid item key={index}>
							<ProjectCard 
								name={firebase.getCurrentUsername()}
								title={project.title} />
						</Grid>
						)}
					</Grid>
					: <CircularProgress />}
				</div>
				<Fab className={classes.fab} color="primary" aria-label="add" onClick={handleClickOpen}>
					<AddIcon />
				</Fab>
				<Dialog
					open={openDialog}
					onClose={handleClickClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					style={{cursor: "default"}}>
						<DialogTitle id="alert-dialog-title">
							<MuiThemeProvider theme={typographyTheme}>
								<Typography component="h1" variant="h5">
									{`Adding new project`}
								</Typography>
							</MuiThemeProvider>
						</DialogTitle>
						<DialogContent>
							<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
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
										inputProps={{min: 0, style: { marginLeft: '20px' }, maxLength: 500}}
										disableUnderline 
										placeholder="Project description.."
										className={classes.input}
										autoComplete="off" 
										value={description} 
										onChange={e => setDescription(e.target.value)} />
								</FormControl>
								{links.map((x, i) =>
								{
									return(
										<FormControl margin="normal" required fullWidth>
											<Input id="links" name="links"
												inputProps={{min: 0, style: { marginLeft: '20px' }}}
												disableUnderline 
												placeholder={`link #${i+1}`}
												className={classes.input}
												autoComplete="off" 
												value={x.links} 
												onChange={e => handleInputChange(e, i)} />
											<div>
												{links.length !== 1 && <Button
												onClick={() => handleRemoveClick(i)}>Remove</Button>}
												{links.length - 1 === i && <Button onClick={handleAddClick}>Add</Button>}
											</div>
										</FormControl>
									);
								})}
								<FormControl margin="normal" required fullWidth>
									<Input id="video" name="video"
										inputProps={{min: 0, style: { marginLeft: '20px' }}}
										disableUnderline 
										placeholder="Video.."
										className={classes.input}
										autoComplete="off" 
										value={video} 
										onChange={e => setVideo(e.target.value)} />
								</FormControl>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									onClick={addProject}
									className={classes.submit}>
									Add
								</Button>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									onClick={clearForm}
									className={classes.submit}>
									Clear form
								</Button>
							</form>
						</DialogContent>
				</Dialog>
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

	async function addProject()
	{
		try
		{
			await firebase.addProject(title, type, description, links, video);
			setOpenDialog(false);
			setOpenSuccess(true);
			setUpdate(true);
			clearForm();
		}
		catch(error)
		{
			setError(error.message);
			setOpenError(true);
		}
	}

	async function uploadImage()
	{
		try 
		{
			if (image.size < 5000000) //less then 5mb
			{
				await firebase.uploadImage(image, firebase.getCurrentUsername());
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

	async function getImageURL()
	{
		var username = firebase.getCurrentUsername();
		firebase.storage.ref("Profile images").child(username).getDownloadURL().then(
			url => {setUrl(url);}
		);
	}

	async function logout() {
		await firebase.logout();
		props.history.push('/');
	}
}

export default withRouter(withStyles(styles)(Dashboard));