import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Container, FixedBackground, LoginLink, Picture, SubtitleContianer, Text, Paragraph, ParagraphWrapper, HeroContianer } from './HomePageElements';
import Vector1 from '../../images/Vector1.svg';
import Vector2 from '../../images/Vector2.svg';
import Vector3 from '../../images/Vector3.svg';
import { Helmet } from 'react-helmet';

const styles = theme => ({
	button: 
	{
		color: '#ff4040',
		fontSize: '20px',
		fontWeight: '600',
		letterSpacing: '1px',
		border: '3px solid #ff4040',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(1),
		textTransform: 'capitalize',
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#ff4040'
		}
	},
	grid:
	{
		[theme.breakpoints.down("sm")]:
		{
			paddingTop: '40px'
		}
	},
	item1: {order: 1},
	item2: {order: 2},
	item3:
	{
		order: 3,
		[theme.breakpoints.down("sm")]:
		{
			order: 4
		}
	},
	item4:
	{
		order: 4,
		[theme.breakpoints.down("sm")]:
		{
			order: 3
		}
	},
	item5: {order: 5},
	item6: {order: 6}
});

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Caveat", sans-serif`,
			lineHeight: 1
		},
		h1:
		{
			'@media (max-width:300px)':
			{
				fontSize: '80px'
			}
		},
		h4:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
			fontWeight: "bold"
		},
		h5:
		{
			color: 'white',
			fontFamily: `"Andika New Basic", sans-serif`,
			fontWeight: 'bold',
			textShadow: '3px 3px black'
		},
		subtitle1:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
			fontSize: "20px",
			lineHeight: 1.4
		}
	}
});

function HomePage(props) {
	const { classes } = props;

	return (
		<Container>
			<Helmet><title>Portfolio Plus | Home</title></Helmet>
			<HeroContianer>
				<MuiThemeProvider theme={theme}>
					<Typography variant="h1" gutterBottom>
						One place, countless works
					</Typography>
				</MuiThemeProvider>
				<SubtitleContianer>
					<MuiThemeProvider theme={theme}>
						<Typography variant="h3" gutterBottom>
							The importance of a portfolio is known for every inexperienced job seeker. <br />
							On Portfolio Plus, you can create your own landing page with all of
							your works in just a few clicks!
						</Typography>
					</MuiThemeProvider>
				</SubtitleContianer>
				<Button to="/register"
					variant="contained"
					component={Link}
					className={classes.button}>
						Get started!
				</Button>
				<Text>
					Already have an account? <LoginLink to="/login">Login!</LoginLink>	
				</Text>
				<Text>
					Having trouble? <LoginLink to="/">Get some help!</LoginLink>	
				</Text>
			</HeroContianer>
			<FixedBackground>
				<MuiThemeProvider theme={theme}>
					<Typography variant="h5">
						What is Portfolio Plus?
					</Typography>
				</MuiThemeProvider>
			</FixedBackground>
			<ParagraphWrapper>
			<Paragraph>
				Portfolio Plus is a free service for creating a designed landing page with all of your personal projects and works.
			</Paragraph>
			</ParagraphWrapper>
			<FixedBackground>
				<MuiThemeProvider theme={theme}>
					<Typography variant="h5">
						Why using Portfolio Plus?
					</Typography>
				</MuiThemeProvider>
			</FixedBackground>
			<Grid
				className={classes.grid}
				spacing={0}
				container
				direction="row"
				justify="center"
				alignItems="center">
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item1}>
						<MuiThemeProvider theme={theme}>
							<Typography variant="h4" gutterBottom>
								Easy to use and manage
							</Typography>
							<Typography variant="subtitle1">
								Add, edit and delete projects in just few clicks.<br />
								Send just one link to whom you wish to share your projects with!
							</Typography>
						</MuiThemeProvider>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item2}>
						<Picture src={Vector1} alt="Vector1" />
					</Grid>
					{/*---*/}
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item3}>
						<Picture src={Vector2} alt="Vector2" />
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item4}>
						<MuiThemeProvider theme={theme}>
							<Typography variant="h4" gutterBottom>
								Save precious time
							</Typography>
							<Typography variant="subtitle1">
								Creating any project can take some time.<br />
								Don't waste more time on looking for a place to share it.
							</Typography>
						</MuiThemeProvider>
					</Grid>
					{/*---*/}
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item5}>
						<MuiThemeProvider theme={theme}>
							<Typography variant="h4" gutterBottom>
								Impress potential employers
							</Typography>
							<Typography variant="subtitle1">
								For an inexperienced employee, a portfolio is a "Business Card" for his skills.
								Attached your link to your CV or send it to employers, so they'll see your works.
							</Typography>
						</MuiThemeProvider>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item6}>
						<Picture src={Vector3} alt="Vector3" />
					</Grid>
				</Grid>
		</Container>
	)
}

export default withStyles(styles)(HomePage);