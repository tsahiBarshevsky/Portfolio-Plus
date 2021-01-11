import React, { useState, useEffect } from 'react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputAdornment, Snackbar, Tooltip, Fade } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PersonIcon from '@material-ui/icons/Person';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';
import Background from '../../images/Backgrounds/forms.png';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { Helmet } from 'react-helmet';

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
		[theme.breakpoints.up(400 + theme.spacing(6))]: 
		{
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
		backgroundColor: 'rgba(40, 57, 101, 0.4)',
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
	formControl:
	{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',	
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
	helpIcon:
	{
		fontSize: '20px',
		color: 'rgba(255, 255, 255, 0.65)',
		margin: '10px',
		cursor: 'pointer'
	},
	tooltip: {fontSize: '15px', textAlign: 'center', lineHeight: 1.2}
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
			fontSize: '15px'
		}
	}
});

function Register(props) 
{
	const { classes } = props;
	const [users, setUsers] = useState([]);
	const [name, setName] = useState('');
	const [profession, setProfession] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		firebase.getAllUsers().then(setUsers);
	}, []);

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
			<Helmet><title>Portfolio Plus | Register</title></Helmet>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<PersonAddRoundedIcon className={classes.icon} />
				</Avatar>
				<MuiThemeProvider theme={theme}>
					<Typography align="center" component="h1" variant="h5">
						Create new account
					</Typography>
				</MuiThemeProvider>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
					<FormControl className={classes.formControl} margin="normal" required fullWidth>
						<Input id="name" name="name"
							fullWidth
							disableUnderline 
							placeholder="Username.."
							className={classes.input}
							autoComplete="off" 
							autoFocus value={name} 
							onChange={e => setName(e.target.value)} 
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<PersonIcon />
							</InputAdornment>} />
						<Tooltip title={<p className={classes.tooltip}>This is how you will identify your own page</p>}
							TransitionComponent={Fade} arrow
							TransitionProps={{ timeout: 400 }}>
							<HelpOutlineOutlinedIcon className={classes.helpIcon} />
						</Tooltip>
					</FormControl>
					<FormControl className={classes.formControl} margin="normal" required fullWidth>
						<Input id="profession" name="profession"
							fullWidth
							disableUnderline 
							placeholder="Profession.."
							className={classes.input}
							autoComplete="off" 
							value={profession} 
							onChange={e => setProfession(e.target.value)} 
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<WorkOutlineOutlinedIcon />
							</InputAdornment>} />
						<Tooltip title={<p className={classes.tooltip}>What are you doing in life?</p>}
							TransitionComponent={Fade} arrow
							TransitionProps={{ timeout: 400 }}>
							<HelpOutlineOutlinedIcon className={classes.helpIcon} />
						</Tooltip>
					</FormControl>
					<FormControl className={classes.formControl} margin="normal" required fullWidth>
						<Input id="email" name="email"
							fullWidth
							disableUnderline
							placeholder="Email address.."
							className={classes.input}  
							autoComplete="off" 
							value={email} 
							onChange={e => setEmail(e.target.value)}
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<AlternateEmailIcon />
							</InputAdornment>} />
						<Tooltip title={<p className={classes.tooltip}>The email will serve you to login to your account</p>}
							TransitionComponent={Fade} arrow
							TransitionProps={{ timeout: 400 }}>
							<HelpOutlineOutlinedIcon className={classes.helpIcon} />
						</Tooltip>
					</FormControl>
					<FormControl className={classes.formControl} margin="normal" required fullWidth>
						<Input id="password" name="password"
							fullWidth
							disableUnderline 
							placeholder="Password.."
							className={classes.input} 
							type="password"
							autoComplete="off" 
							value={password} 
							onChange={e => setPassword(e.target.value)}
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<LockOutlinedIcon />
							</InputAdornment>} />
						<Tooltip title={<p className={classes.tooltip}>Must contain at least 6 characters</p>} 
							TransitionComponent={Fade} arrow
							TransitionProps={{ timeout: 400 }}>
							<HelpOutlineOutlinedIcon className={classes.helpIcon} />
						</Tooltip>
					</FormControl>
					<Button
						type="submit"
						onClick={onRegister}
						className={classes.submit}>
						Register
          			</Button>
				</form>
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

	async function onRegister() 
	{
		var fault = false;
		//check username availability
		for (let index = 0; index < users.length; index++) 
		{
			if (name === users[index].username)
				fault = true;		
		}
		if (!fault) //username available
		{
			try 
			{
				await firebase.register(name, email, password); //register
				await firebase.addUserToList(name, profession, "N/A", "default"); //add to users' list
				props.history.replace('/dashboard');
			} 
			catch(error) 
			{
				setOpen(true);
				setError(error.message);
			}
		}
		else //username unavailable
		{
			setOpen(true);
			setError("Username is already taken. Please choose other username.")
		}
	}
}

export default withRouter(withStyles(styles)(Register))