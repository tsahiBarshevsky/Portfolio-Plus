import React from 'react';
import { Typography, Paper, Avatar, Button } from '@material-ui/core';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Container, LoginLink, SubtitleContianer, Text } from './HomePageElements';

const styles = theme => ({
	button: 
	{
		borderRadius: '25px',
		fontSize: '20px',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(1),
		textTransform: 'capitalize'
	}
});

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Caveat", sans-serif`,
			lineHeight: 1
		}
	}
});

function HomePage(props) {
	const { classes } = props;

	return (
		<Container>
			<MuiThemeProvider theme={theme}>
				<Typography variant="h1" gutterBottom>
					Countless works, one place
				</Typography>
			</MuiThemeProvider>
			<SubtitleContianer>
				<MuiThemeProvider theme={theme}>
					<Typography variant="h3" gutterBottom>
						The importance of a portfolio is known for every inexperienced job seeker. <br />
						On this website, you can create your own landing page with all of
						your works in just a few clicks!
					</Typography>
				</MuiThemeProvider>
			</SubtitleContianer>
			<Button
				variant="contained"
				color="primary"
				component={Link}
				to="/register"
				className={classes.button}>
					Get started!
			</Button>
			<Text>
				Already have an account?
				<LoginLink to="/login">Login!</LoginLink>	
			</Text>
		</Container>
	)
}

export default withStyles(styles)(HomePage)