import React, { useState } from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, DialogActions, Fab, Paper, Typography, Snackbar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import firebase from '../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    main: 
	{
		width: 'auto',
		display: 'block',
		borderRadius: '20px',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		backgroundColor: 'white',
		backgroundPosition: 'center', 
		backgroundRepeat: 'no-repeat',
		[theme.breakpoints.up(400 + theme.spacing(6))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: 
	{
		display: 'flex',
		justifyContent: 'space-between',
		borderRadius: '20px',
		marginTop: theme.spacing(8),
		alignItems: 'center',
		boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    fab: 
	{
		margin: '5px'
	}
}));

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
		},
	}
});

function ProjectCard(props) 
{
	const classes = useStyles();
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
	}

	const closeSnackbar = () =>
	{
		setOpenSuccess(false);
	}

    return (
		<Paper className={classes.paper}>
			<MuiThemeProvider theme={theme}>
				<Typography variant="subtitle1">
					{props.title}
				</Typography>
			</MuiThemeProvider>
			<div>
				<Fab className={classes.fab} color="primary" size="small">
					<VisibilityIcon />
				</Fab>
				<Fab className={classes.fab} color="primary" size="small">
					<EditIcon />
				</Fab>
				<Fab className={classes.fab} color="primary" size="small" onClick={handleOpen}>
					<DeleteIcon />
				</Fab>
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
		</Paper>
	);
	
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
