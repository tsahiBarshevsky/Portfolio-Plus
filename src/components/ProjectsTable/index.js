import React, { useState, useEffect } from 'react';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { green, red, blueGrey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, Fade, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { Button, DialogActions, Typography, Snackbar, Input, FormControl } from '@material-ui/core';
import { Table, TableContainer, TableData, TableHead, TableRow, Warning, ButtonWrapper } from './ProjectsTableElements';
import { get } from 'react-scroll/modules/mixins/scroller';

const styles = theme => ({
    submit:
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
	deleteButton: 
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
		color: blueGrey[50],
		backgroundColor: blueGrey[900],
		marginRight: theme.spacing(2),
		"&:hover":
		{
			backgroundColor: blueGrey[800],
		}
    },
    options:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent'
    },
    tooltip: {fontSize: '15px', textAlign: 'center'}
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

function ProjectsTable(props) 
{
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState('');
    const [success, setSuccess] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState('');
    const [project, setProject] = useState('');
    const [type, setType] = useState('');
	const [description, setDescription] = useState('');
	const [links, setLinks] = useState([{link: ''}]);
    const [video, setVideo] = useState('');

    const { classes } = props;
    const dialogBackground = {backgroundColor: '#f5f5f5'};

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
    
    const handleOpenEditDialog = () =>
	{
		setTimeout(() => {
			
		}, 500);
		setOpenDialog(true);
		//getSingleProject();
    }

    /*if (openDialog)
        getSingleProject();*/
    
    return (
        <>
            <TableContainer>
                <Table>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Project name</TableHead>
                        <TableHead>Project type</TableHead>
                        <TableHead>Number of links</TableHead>
                        <TableHead>Youtube video?</TableHead>
                        <TableHead>Options</TableHead>
                    </TableRow>
                    {props.projects.map((project, index) =>
                        <TableRow key={index}>
                            <TableData>{index+1}</TableData>
                            <TableData>{project.title}</TableData>
                            <TableData>{project.type}</TableData>
                            <TableData>{project.links !== null ? project.links.length : "0"}</TableData>
                            <TableData>
                                {project.video !== null ? 
                                    <CheckCircleOutlineRoundedIcon style={{color: green[600]}} />
                                    : 
                                    <HighlightOffRoundedIcon style={{color: red[900]}} />}
                            </TableData>
                            <TableData className={classes.options}>
                                <Tooltip title={<p className={classes.tooltip}>Edit</p>} 
                                    TransitionComponent={Fade} 
                                    TransitionProps={{ timeout: 400 }}
                                    enterDelay={500} arrow>
                                    <Fab className={classes.fab} size="small" onClick={() => {props.projects.map((a, b) => b === index ? setTitle(a.title) : null); handleOpenEditDialog()}}>
                                        <EditIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title={<p className={classes.tooltip}>Delete</p>}
                                    TransitionComponent={Fade} 
                                    TransitionProps={{ timeout: 400 }}
                                    enterDelay={500} arrow>
                                    <Fab className={classes.fab} size="small" onClick={() => {props.projects.map((a, b) => b === index ? setTitle(a.title) : null); handleOpen();}}>
                                        <DeleteIcon />
                                    </Fab>
                                </Tooltip>
                            </TableData>
                        </TableRow>
                    )}
                </Table>
            </TableContainer>  
            <Dialog
                open={open}
                onClose={handleClose}
                style={{cursor: "default", borderRadius: '25px'}}>
                    <DialogTitle style={dialogBackground}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Warning style={{fontSize: '30px'}} />
                            <MuiThemeProvider theme={theme}>
                                <Typography component="h1" variant="h5">
                                    {`Delete project`}
                                </Typography>
                            </MuiThemeProvider>
                        </div>
                    </DialogTitle>
                    <DialogContent style={dialogBackground}>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="h6" gutterBottom>
                                {`Hey, wait! Are you sure you want to delete ${title}?`}
                            </Typography>
                        </MuiThemeProvider>
                    </DialogContent>
                    <DialogActions style={dialogBackground}>
                        <Button onClick={handleClose} className={classes.submit}>Cancel</Button>
                        <Button onClick={deleteProject} className={classes.deleteButton}>Delete</Button>
                    </DialogActions>
            </Dialog>
			<Dialog onEnter={getSingleProject}
			fullWidth
				open={openDialog}
				onClose={handleClose}
				style={{cursor: "default"}}>
					<DialogTitle style={dialogBackground}>
						<MuiThemeProvider theme={theme}>
							<Typography variant="h5">
								{`Edit ${title}`}
							</Typography>
						</MuiThemeProvider>
					</DialogTitle>
					<DialogContent style={dialogBackground}>
						<form onSubmit={e => e.preventDefault() && false }>
							<MuiThemeProvider theme={theme}>
								<Typography variant="subtitle2">
									{`Project type`}
								</Typography>
							</MuiThemeProvider>
							<FormControl fullWidth>
								<Input id="type" name="type"
									inputProps={{min: 0, style: { marginLeft: '20px' }}}
									disableUnderline 
									placeholder="New project type.."
									className={classes.input}
									autoComplete="off" 
									autoFocus value={type} 
									onChange={e => {setType(e.target.value); console.log(type);}} />
							</FormControl>
							<MuiThemeProvider theme={theme}>
								<Typography variant="subtitle2">
									{`Project description`}
								</Typography>
							</MuiThemeProvider>
							<FormControl fullWidth>
								<Input id="description" name="description"
									inputProps={{min: 0, style: { marginLeft: '20px' }, maxLength: 500}}
									disableUnderline 
									placeholder="New project description.."
									className={classes.input}
									autoComplete="off" 
									value={description} 
									onChange={e => setDescription(e.target.value)} />
							</FormControl>
							{links ?
							<>
								<MuiThemeProvider theme={theme}>
									<Typography variant="subtitle2">
										{links.length === 1 ? 'Link' : 'links'}
									</Typography>
								</MuiThemeProvider>
								{links.map((link, index) =>
								<FormControl fullWidth>
									<Input id="links" name="links"
										inputProps={{min: 0, style: { marginLeft: '20px' }}}
										disableUnderline 
										className={classes.input}
										autoComplete="off" 
										value={link}
										placeholder={`New link #${index+1}`}
										onChange={e => handleInputChange(e, index)} />
								</FormControl>
							)}
							</> : null}
							{video ? 
							<>
								<MuiThemeProvider theme={theme}>
									<Typography variant="subtitle2">
										{`Youtube video URL`}
									</Typography>
								</MuiThemeProvider>
								<FormControl fullWidth>
									<Input id="video" name="video"
										inputProps={{min: 0, style: { marginLeft: '20px' }}}
										disableUnderline 
										placeholder="New video URL.."
										className={classes.input}
										autoComplete="off" 
										value={video} 
										onChange={e => setVideo(e.target.value)} />
								</FormControl>
							</> : "deleted"}
							<ButtonWrapper>
								<Button	type="submit" className={classes.submit} onClick={updateProject}>
									Edit
								</Button>
							</ButtonWrapper>
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
        </>
    )

    async function getSingleProject()
	{
		try 
		{
			await firebase.getSingleProject(props.name, title).then(setProject);
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
			/*situations:
			1. no links no video
			2. do links no video
			3. no links do video
			3. do links do video */
			var result;
			switch(true)
			{
				//1. no links no video
				case links === null && video === null:
					if (type !== '' && description !== '')
					{
						await firebase.updateProject(props.name, project.title,	type, description, null, null);
						props.setUpdate(true);
						setType('');
						setDescription('');
						setVideo('');
						handleClose();
						setSuccess(`${project.title} has been successfully updated`);
						setOpenSuccess(true);
					}
					else
					{
						setError("One of the fields has left blank");
						setOpenError(true);
					}
					break;
				//2. do links no video
				case links && video === null:
					var fault = false;
					for (var i=0; i<links.length; i++)
						if (links[i] === '')
							fault = true;
					if (type !== '' && description !== '' && !fault)
					{
						await firebase.updateProject(props.name, project.title,	type, description, links, null);
						props.setUpdate(true);
						setType('');
						setDescription('');
						setVideo('');
						handleClose();
						setSuccess(`${project.title} has been successfully updated`);
						setOpenSuccess(true);
					}
					else
					{
						setError("One of the fields has left blank");
						setOpenError(true);
					}
					break;
				//3. no links do video
				case links === null && video !== null:
					result = checkVideoURL();
					if (result)
					{
						if (type !== '' && description !== '')
						{
							await firebase.updateProject(props.name, project.title,	type, description, null, result);
							props.setUpdate(true);
							setType('');
							setDescription('');
							setVideo('');
							handleClose();
							setSuccess(`${project.title} has been successfully updated`);
							setOpenSuccess(true);
						}
						else
						{
							setError("One of the fields has left blank");
							setOpenError(true);
						}
					}
					else
					{
						setError("Invalid youtube URL!");
						setOpenError(true);
					}
					break;
				//4. do links do video
				default:
					result = checkVideoURL();
					if (result)
					{
						var fault = false;
						for (var i=0; i<links.length; i++)
							if (links[i] === '')
								fault = true;
						if (type !== '' && description !== '' && !fault)
						{
							await firebase.updateProject(props.name, project.title,	type, description, links, result);
							props.setUpdate(true);
							setType('');
							setDescription('');
							setVideo('');
							handleClose();
							setSuccess(`${project.title} has been successfully updated`);
							setOpenSuccess(true);
						}
						else
						{
							setError("One of the fields has left blank");
							setOpenError(true);
						}
					}
					else
					{
						setError("Invalid youtube URL!");
						setOpenError(true);
					}
			}
			/*props.setUpdate(true);
			setType('');
			setDescription('');
			setVideo('');
			handleClose();
			setSuccess(`${project.title} has been successfully updated`);
			setOpenSuccess(true);*/
			/*if (!video)
			{
				//check if one of the links is empty
				var fault = false;
				for (var i=0; i<links.length; i++)
					if (links[i] === '')
						fault = true;
				if (type !== '' && description !== '' && !fault)
				{
					await firebase.updateProject(props.name, project.title,	type, description, links, null);
					props.setUpdate(true);
					setType('');
					setDescription('');
					setVideo('');
					handleClose();
					setSuccess(`${project.title} has been successfully updated`);
					setOpenSuccess(true);
				}
				else
				{
					setError("One of the fields has left blank");
					setOpenError(true);
				}
			}
			else
			{
				const result = checkVideoURL();
				if (result)
				{
					//check if one of the links is empty
					var fault = false;
					for (var i=0; i<links.length; i++)
						if (links[i] === '')
							fault = true;
					if (type !== '' && description !== '' && !fault)
					{
						await firebase.updateProject(props.name, project.title,	type, description, links, result);
						props.setUpdate(true);
						setType('');
						setDescription('');
						setVideo('');
						handleClose();
						setSuccess(`${project.title} has been successfully updated`);
						setOpenSuccess(true);
					}
					else
					{
						setError("One of the fields has left blank");
						setOpenError(true);
					}
				}
				else
				{
					setError("Invalid youtube URL!");
					setOpenError(true);
				}
			}*/
		} 
		catch (error) 
		{
			setError("An unexpected error occurred");
			setOpenError(true);
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
			await firebase.deleteProject(title);
			setSuccess(`${title} has been successfully deleted`);
			setOpenSuccess(true);
            props.setUpdate(true);
		} 
		catch (error)
		{
			alert(error.message);
		}
	}
}

export default (withStyles(styles)(ProjectsTable));
