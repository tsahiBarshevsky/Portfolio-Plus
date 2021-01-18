import React, { useState } from 'react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputAdornment, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Background from '../../images/Backgrounds/forms.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const styles = theme => ({
	main: 
	{
		width: 'auto',
		display: 'block',
		borderRadius: '20px',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		backgroundImage: `url(${Background})`,
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
		borderRadius: '20px',
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
		backgroundColor: 'rgba(40, 57, 101, 0.5)',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	avatar: 
	{
		width: theme.spacing(7),
		height: theme.spacing(7),
		margin: theme.spacing(1),
		backgroundColor: 'white'
	},
	icon:
	{
		color: 'black',
		width: theme.spacing(4),
		height: theme.spacing(4)
	},
	form: 
	{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		marginTop: theme.spacing(1),
	},
	input:
	{
		backgroundColor: 'rgba(255, 255, 255, 0.65)',
        height: '40px',
        borderRadius: '25px',
		fontFamily: 'Andika New Basic'
	},
	submit: 
	{
		color: 'white',
		fontSize: '17px',
		textTransform: 'capitalize',
		width: '130px',
		height: '40px',
		border: '2px solid white',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		marginTop: theme.spacing(3),
		"&:hover": 
		{
			color: 'black',
			backgroundColor: 'white'
		}
	},
	link:
	{
		textAlign: 'center',
		textDecoration: 'none',
		color: 'white',
		transition: 'all 0.5s ease-out',
		"&:hover": 
		{
			transition: 'all 0.5s ease-in',
			color: '#ff4040'
		}
	},
});

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
			color: 'white'
		},
		subtitle1:
		{
			marginTop: '10px',
			lineHeight: 1.2
		}
	}
});

function SignIn(props) 
{
	const { classes } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [open, setOpen] = useState(false);

	if (firebase.getCurrentUsername()) {
		props.history.replace('/dashboard');
		return null;
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
			<Helmet><title>Portfolio Plus | Login</title></Helmet>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VpnKeyIcon className={classes.icon}/>
				</Avatar>
				<MuiThemeProvider theme={theme}>
					<Typography align="center" component="h1" variant="h5">
						Sign in
					</Typography>
				</MuiThemeProvider>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<Input 
							className={classes.input}
							disableUnderline
							id="email" name="email" 
							placeholder="Email address.."
							autoComplete="off" 
							autoFocus 
							value={email} 
							onChange={e => setEmail(e.target.value)}
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<AlternateEmailIcon />
							</InputAdornment>} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<Input 
							className={classes.input}
							disableUnderline
							name="password" id="password"
							placeholder="Password.."
							type="password" 
							autoComplete="off" 
							value={password} 
							onChange={e => setPassword(e.target.value)}
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<LockOutlinedIcon />
							</InputAdornment>} />
					</FormControl>
					<Button
						type="submit"
						onClick={login}
						className={classes.submit}>
						Sign in
          			</Button>
				</form>
				<MuiThemeProvider theme={theme}>
					<Typography align="center" variant="subtitle1">
						Doesn't have an account? <Link to="/register" className={classes.link}>Sign up</Link>
					</Typography>
					<Typography style={{transform: 'translateY(-30%)'}}
						align="center" variant="subtitle1">
						Forgot your password? <Link to="/reset-password" className={classes.link}>Reset</Link>
					</Typography>
				</MuiThemeProvider>
			</Paper>
			<Snackbar open={open} autoHideDuration={3500} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error">
					<MuiThemeProvider theme={theme}>
						<Typography align="center" variant="subtitle2">
							{error}
						</Typography>
					</MuiThemeProvider>
                </Alert>
            </Snackbar>
		</main>
	)

	async function login() 
	{
		try 
		{
			await firebase.login(email, password);
			props.history.replace('/dashboard');
		} 
		catch(error) 
		{
			setOpen(true);
			if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.')
				setError("There's no user record corresponding to this identifier")
			else
				setError("An unexpected error occurred");
			console.log(error.message);
		}
	}
}

export default withRouter(withStyles(styles)(SignIn))