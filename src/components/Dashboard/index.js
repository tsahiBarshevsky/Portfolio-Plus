import React, { useEffect, useState } from 'react';
import { Typography, Paper, Avatar, FormControl, Input, Button, Snackbar } from '@material-ui/core';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	input:
	{
		backgroundColor: 'rgba(255, 255, 255, 0.65)',
        height: '40px',
        borderRadius: '25px',
		fontFamily: 'Andika New Basic'
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
			fontSize: '15px'
		}
	}
});

function Dashboard(props) {
	const { classes } = props;
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

	const closeSnackbar = () =>
	{
		setOpen(false);
	}

	return (
		<main className={classes.main}>
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
		</main>
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

export default withRouter(withStyles(styles)(Dashboard))