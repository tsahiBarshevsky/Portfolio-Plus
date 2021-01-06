import React, { useEffect, useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, DialogActions, Typography, Snackbar, Input, FormControl, Tooltip, Fade, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';
import { Container, Warning } from './projectCardElements';
import { withStyles } from '@material-ui/core/styles';
import { blueGrey, red } from '@material-ui/core/colors';

const styles = theme => ({
	cancleButton: 
	{
		width: '85px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'orange',
		fontSize: '15px',
		fontWeight: '600',
		border: '2px solid orange',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		textTransform: 'capitalize',
		cursor: 'pointer',
		margin: theme.spacing(1),
		transition: 'all 0.2s ease-out',
		'&:hover':
		{
			color: 'white',
			backgroundColor: 'orange',
			transition: 'all 0.2s ease-in'
		}
	},
	deleteButton: 
	{
		width: '85px',
		color: 'white',
		fontSize: '15px',
		fontWeight: '600',
		border: '2px solid orange',
		backgroundColor: 'orange',
		borderRadius: '25px',
		textTransform: 'capitalize',
		margin: theme.spacing(1),
		'&:hover':
		{
			color: 'orange',
			backgroundColor: 'transparent',
		}
	},
	input:
	{
		backgroundColor: 'rgba(0, 0, 0, 0.65)',
        height: '40px',
        borderRadius: '25px',
		fontFamily: 'Andika New Basic'
	},
	fab:
	{
		color: blueGrey[50],
		backgroundColor: blueGrey[900],
		margin: theme.spacing(0.4),
		"&:hover":
		{
			backgroundColor: blueGrey[800],
		}
	}
});

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
		},
		subtitle1:
		{
			fontSize: '20px',
		},
		subtitle2:
		{
			color: red[800]
		}
	}
});

const theme2 = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
		}
	}
});

function ProjectCard(props) 
{
	const [open, setOpen] = useState(false);
	const [openSuccess, setOpenSuccess] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const [project, setProject] = useState('');
	const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [links, setLinks] = useState([{link: ''}]);
	const [video, setVideo] = useState('');
	const [openError, setOpenError] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const { classes } = props;

	useEffect(() => {
		setType(project.type);
		setDescription(project.description);
		setLinks(project.links);
		setVideo(project.video);
	}, [project]);

	const Alert = (props) =>
    {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleOpen = () =>
	{
		setOpen(true);
	}

	const handleClose = () =>
	{
		setOpen(false);
		setOpenDialog(false);
	}

	const handleOpenEditDialog = () =>
	{
		setOpenDialog(true);
		getSingleProject();
	}

	const closeSnackbar = () =>
	{
		setOpenSuccess(false);
		setOpenError(false);
	}

	const handleInputChange = (e, index) => 
	{
		const { value } = e.target;
		const list = [...links];
		list[index] = value;
		setLinks(list);
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

    return (
		<Container>
			<MuiThemeProvider theme={theme}>
				<Typography variant="subtitle1">
					{props.title.length <= 10 ? props.title : `${props.title.slice(0, 10)}...`}
				</Typography>
			</MuiThemeProvider>
			<div>
				<Tooltip title="Edit" 
					TransitionComponent={Fade} 
					TransitionProps={{ timeout: 400 }}
					enterDelay={500}>
					<Fab className={classes.fab} size="small" onClick={handleOpenEditDialog}>
						<EditIcon />
					</Fab>
				</Tooltip>
				<Tooltip title="Delete" 
					TransitionComponent={Fade} 
					TransitionProps={{ timeout: 400 }}
					enterDelay={500}>
					<Fab className={classes.fab} size="small" onClick={handleOpen}>
						<DeleteIcon />
					</Fab>
				</Tooltip>
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				style={{cursor: "default", borderRadius: '25px'}}>
					<DialogTitle>
						<div style={{display: 'flex', flexDirection: 'row'}}>
							<Warning style={{fontSize: '30px'}} />
							<MuiThemeProvider theme={theme}>
								<Typography component="h1" variant="h5">
									{`Delete project`}
								</Typography>
							</MuiThemeProvider>
						</div>
					</DialogTitle>
					<DialogContent>
						<MuiThemeProvider theme={theme}>
							<Typography variant="h6" gutterBottom>
								{`Wait! Are you sure you want to delete ${props.title}?`}
							</Typography>
						</MuiThemeProvider>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} className={classes.cancleButton}>Cancel</Button>
						<Button onClick={deleteProject} className={classes.deleteButton}>Delete</Button>
					</DialogActions>
			</Dialog>
			<Dialog
				open={openDialog}
				onClose={handleClose}
				style={{cursor: "default"}}>
					<DialogTitle id="alert-dialog-title">
						<MuiThemeProvider theme={theme}>
							<Typography component="h1" variant="h5">
								{`Edit ${project.title}`}
							</Typography>
						</MuiThemeProvider>
					</DialogTitle>
					<DialogContent>
						<form onSubmit={e => e.preventDefault() && false }>
							<MuiThemeProvider theme={theme}>
								<Typography variant="subtitle2">
									{`Project type`}
								</Typography>
							</MuiThemeProvider>
							<FormControl margin="normal" fullWidth>
								<Input id="type" name="type"
									inputProps={{min: 0, style: { marginLeft: '20px' }}}
									disableUnderline 
									placeholder="New project type.."
									className={classes.input}
									autoComplete="off" 
									value={type} 
									onChange={e => setType(e.target.value)} />
							</FormControl>
							
							<MuiThemeProvider theme={theme}>
								<Typography variant="subtitle2">
									{`Project description`}
								</Typography>
							</MuiThemeProvider>
							<FormControl margin="normal" fullWidth>
								<Input id="description" name="description"
									inputProps={{min: 0, style: { marginLeft: '20px' }, maxLength: 500}}
									disableUnderline 
									placeholder="New project description.."
									className={classes.input}
									autoComplete="off" 
									value={description} 
									onChange={e => setDescription(e.target.value)} />
							</FormControl>
							
							<MuiThemeProvider theme={theme}>
								<Typography variant="subtitle2">
									{`Links`}
								</Typography>
							</MuiThemeProvider>
							{links ?
							links.map((link, index) =>
								<FormControl margin="normal" required fullWidth>
									<Input id="links" name="links"
										inputProps={{min: 0, style: { marginLeft: '20px' }}}
										disableUnderline 
										className={classes.input}
										autoComplete="off" 
										value={link}
										onChange={e => handleInputChange(e, index)} />
								</FormControl>
							) : null}

							<MuiThemeProvider theme={theme}>
								<Typography variant="subtitle2">
									{`Video URL`}
								</Typography>
							</MuiThemeProvider>
							<FormControl margin="normal" fullWidth>
								<Input id="video" name="video"
									inputProps={{min: 0, style: { marginLeft: '20px' }}}
									disableUnderline 
									placeholder="New video URL.."
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
								className={classes.submit}
								onClick={updateProject}>
								Edit
							</Button>
						</form>
					</DialogContent>
			</Dialog>
			<Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
				<Alert onClose={closeSnackbar} severity="success">
					<MuiThemeProvider theme={theme2}>
						<Typography align="center" variant="subtitle2">
							{success}
						</Typography>
					</MuiThemeProvider>
				</Alert>
			</Snackbar>
			<Snackbar open={openError} autoHideDuration={3500} onClose={closeSnackbar}>
				<Alert onClose={closeSnackbar} severity="error">
					<MuiThemeProvider theme={theme2}>
						<Typography align="center" variant="subtitle2">
							{error}
						</Typography>
					</MuiThemeProvider>
				</Alert>
			</Snackbar>
		</Container>
	);

	async function getSingleProject()
	{
		try 
		{
			await firebase.getSingleProject(props.name, props.title).then(setProject);
		} 
		catch (error) 
		{
			console.log(error.message);
		}
	}

	async function updateProject()
	{
		try 
		{
			const result = checkVideoURL();
			if (result)
			{
				await firebase.updateProject(props.name, project.title,	type, description, links, result);
				props.setUpdate(true);
				setType('');
				setDescription('');
				setVideo('');
				handleClose();
				setSuccess(`${project.title} edited successfully`);
				setOpenSuccess(true);
			}
			else
			{
				setError("Invalid youtube URL");
				setOpenError(true);
			}
		} 
		catch (error) 
		{
			console.log(error.message);
			setType('');
			setDescription('');
			setVideo('');
			handleClose();
		}
	}
	
	async function deleteProject()
	{
		try 
		{
			setOpen(false);
			await firebase.deleteProject(props.title);
			setSuccess(`${project.title} edited successfully`);
			setOpenSuccess(true);
			props.setUpdate(true);
		} 
		catch (error)
		{
			alert(error.message);
		}
	}
}

export default (withStyles(styles)(ProjectCard));
