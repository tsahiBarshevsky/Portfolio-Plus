import React, { useState } from 'react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputAdornment } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';
import Background from '../../images/register-form-background.png';

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
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
		backgroundColor: 'rgba(40, 57, 101, 0.7)',
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
		fontSize: '17px',
		textTransform: 'capitalize',
		width: '130px',
		height: '35px',
		backgroundColor: 'rgba(255, 255, 255, 0.65)',
		borderRadius: '25px',
		marginTop: theme.spacing(3),
		"&:hover":
		{
			backgroundColor: 'rgba(255, 255, 255, 0.55)'
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
		}
	}
});

function Register(props) {
	const { classes } = props;
	//console.log(document.getElementById('myDiv').clientHeight);
	//console.log(document.getElementById('myDiv').clientWidth);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [quote, setQuote] = useState('');

	return (
		<main className={classes.main}>
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
					<FormControl margin="normal" required fullWidth>
						<Input id="name" name="name"
							disableUnderline 
							placeholder="Name.."
							className={classes.input}
							autoComplete="off" 
							autoFocus value={name} 
							onChange={e => setName(e.target.value)} 
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<PersonIcon />
							</InputAdornment>} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<Input id="email" name="email"
							disableUnderline
							placeholder="Email address.."
							className={classes.input}  
							autoComplete="off" 
							value={email} 
							onChange={e => setEmail(e.target.value)}
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<EmailIcon />
							</InputAdornment>} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<Input id="password" name="password"
							disableUnderline 
							placeholder="Password.."
							className={classes.input} 
							type="password"
							autoComplete="off" 
							value={password} 
							onChange={e => setPassword(e.target.value)}
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<LockIcon />
							</InputAdornment>}  />
					</FormControl>
					{/*<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="quote">Your Favorite Quote</InputLabel>
						<Input disableUnderline className={classes.input} name="quote" type="text" id="quote" autoComplete="off" value={quote} onChange={e => setQuote(e.target.value)}  />
					/FormControl>*/}

					<Button
						type="submit"
						onClick={onRegister}
						className={classes.submit}>
						Register
          			</Button>
				</form>
			</Paper>
		</main>
	)

	async function onRegister() {
		try 
		{
			await firebase.register(name, email, password);
			await firebase.addQuote(quote);
			props.history.replace('/dashboard');
		} 
		catch(error) 
		{
			alert(error.message);
		}
	}
}

export default withRouter(withStyles(styles)(Register))