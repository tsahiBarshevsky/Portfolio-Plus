import React, { useEffect, useState } from 'react';
import { Typography, FormControl, Input, Button, Snackbar } from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 240;
const styles = theme => ({
	root: 
	{
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
	content: 
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
	contentShift: 
	{
		transition: theme.transitions.create('margin', 
		{
		  	easing: theme.transitions.easing.easeOut,
		  	duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
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
		subtitle1:
		{
			fontSize: '15px'
		}
	}
});

function Dashboard(props) {
	const { classes } = props;
  	const theme = useTheme();
	const [title, setTitle] = useState('');
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [links, setLinks] = useState('');
	const [video, setVideo] = useState('');
	const [open, setOpen] = useState(false);


	/*useEffect(() =>
	{
		if (firebase.getCurrentUsername())
			firebase.getCurrentUserQuote().then(setQuote);
	}, [firebase.getCurrentUsername(), firebase.getCurrentUserQuote()]);*/

	if (!firebase.getCurrentUsername()) {
		// not logged in
		//console.log('Please login first');
		props.history.replace('/login')
		return null
	}

	const Alert = (props) =>
    {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	/*const closeSnackbar = () =>
	{
		setOpen(false);
	}*/

	const handleDrawerOpen = () => 
	{
		setOpen(true);
	};
	
	const handleDrawerClose = () => 
	{
		setOpen(false);
	};

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
						<Typography component="h1" variant="h5">
							{`Hello, ${firebase.getCurrentUsername()}!`}
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
				className={clsx(classes.content, 
				{
          			[classes.contentShift]: open,
        		})}>
        		<div className={classes.drawerHeader} />
				<Fab className={classes.fab} color="primary" aria-label="add">
					<AddIcon />
				</Fab>
      		</main>
    	</div>
		/*<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
				<MuiThemeProvider theme={theme}>
					<Typography component="h1" variant="h5">
						{`Hello, ${firebase.getCurrentUsername()}!`}
					</Typography>
				</MuiThemeProvider>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
					<FormControl margin="normal" required fullWidth>
						<Input id="title" name="title"
							disableUnderline 
							placeholder="Project title.."
							className={classes.input}
							autoComplete="off" 
							autoFocus value={title} 
							onChange={e => setTitle(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<Input id="type" name="type"
							disableUnderline 
							placeholder="Project type.."
							className={classes.input}
							autoComplete="off" 
							value={type} 
							onChange={e => setType(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<Input id="description" name="description"
							disableUnderline 
							placeholder="Project description.."
							className={classes.input}
							autoComplete="off" 
							value={description} 
							onChange={e => setDescription(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<Input id="links" name="links"
							disableUnderline 
							placeholder="Links.."
							className={classes.input}
							autoComplete="off" 
							value={links} 
							onChange={e => setLinks(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<Input id="video" name="video"
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
						color="secondary"
						onClick={addProject}
						className={classes.submit}>
						Add
          			</Button>
				</form>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					className={classes.submit}>
					Logout
          		</Button>
			</Paper>
			<Snackbar open={open} autoHideDuration={3500} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success">
					<MuiThemeProvider theme={theme}>
						<Typography align="center" variant="subtitle1">
							Project added successfully! 
						</Typography>
					</MuiThemeProvider>
                </Alert>
            </Snackbar>
		</main>*/
	);

	async function addProject()
	{
		try
		{
			await firebase.addProject(title, type, description, links, video);
			setOpen(true);
		}
		catch(error)
		{
			alert(error.message);
		}
	}

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard));