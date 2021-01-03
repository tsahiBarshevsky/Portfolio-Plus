import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, DialogActions, Typography, Snackbar, Input, FormControl } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';
import { Container, Icon, Warning } from './projectCardElements';
import { withStyles } from '@material-ui/core/styles';

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
		}
	}
});

function ProjectCard(props) 
{
	const [open, setOpen] = useState(false);
	const [openSuccess, setOpenSuccess] = useState('');
	const { classes } = props;

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
					{props.title.length <= 10 ? props.title : `${props.title.slice(0, 10)}...`}
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
			props.setUpdate(true);
		} 
		catch (error)
		{
			alert(error.message);
		}
	}
}

export default (withStyles(styles)(ProjectCard));
