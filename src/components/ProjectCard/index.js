import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, DialogActions, Typography, Snackbar, Input, FormControl } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import MuiAlert from '@material-ui/lab/Alert';
import { Container, Icon } from './projectCardElements';

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
		}
	}
});

function ProjectCard(props) 
{
	const [open, setOpen] = useState(false);
	const [openSuccess, setOpenSuccess] = useState('');

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
		//setEdit(false);
	}

	/*const handleOpenEditDialog = () =>
	{
		setEdit(true);
		getSingleProject();
	}*/

	const closeSnackbar = () =>
	{
		setOpenSuccess(false);
	}

    return (
		<Container>
			<MuiThemeProvider theme={theme}>
				<Typography variant="subtitle1">
					{props.title}
				</Typography>
			</MuiThemeProvider>
			<div>
				<Icon color="primary" size="small">
					<EditIcon />
				</Icon>
				<Icon color="primary" size="small" onClick={handleOpen}>
					<DeleteIcon />
				</Icon>
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{cursor: "default"}}>
					<DialogTitle >
						<div style={{display: 'flex', flexDirection: 'row'}}>
							<WarningIcon style={{fontSize: '30px'}} />
							<MuiThemeProvider theme={theme}>
								<Typography component="h1" variant="h5">
									{`Delete project`}
								</Typography>
							</MuiThemeProvider>
						</div>
					</DialogTitle>
					<DialogContent>
						<MuiThemeProvider theme={theme}>
							<Typography variant="h6">
								{`Wait! Are you sure you want to delete ${props.title}?`}
							</Typography>
						</MuiThemeProvider>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={deleteProject}>Delete</Button>
					</DialogActions>
			</Dialog>
			<Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
				<Alert onClose={closeSnackbar} severity="success">
					<MuiThemeProvider theme={theme}>
						<Typography align="center" variant="subtitle1">
							{`Project deleted successfully!`}
						</Typography>
					</MuiThemeProvider>
				</Alert>
			</Snackbar>
		</Container>
	);

	/*async function getSingleProject()
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
			await firebase.updateProject(props.name, props.title, "update type");
		} 
		catch (error) 
		{
			console.log(error.message);
		}
	}*/
	
	async function deleteProject()
	{
		try 
		{
			setOpen(false);
			await firebase.deleteProject(props.title);
			setOpenSuccess(true);
		} 
		catch (error)
		{
			alert(error.message);
		}
	}
}

export default ProjectCard;
