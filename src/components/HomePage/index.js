import React from 'react';
import { Typography, Button, Grid, Divider } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Container, FixedBackground, LoginLink, Picture, SubtitleContianer, 
		 Text, Subtext, HelpLink, Paragraph, ParagraphWrapper, HeroContianer,
		 LinksContainer, FooterLink, Logo } from './HomePageElements';
import Vector1 from '../../images/Vector1.svg';
import Vector2 from '../../images/Vector2.svg';
import Vector3 from '../../images/Vector3.svg';
import { Helmet } from 'react-helmet';
import Emoji from "react-emoji-render";
import { animateScroll as scroll } from 'react-scroll';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { motion } from "framer-motion";
import ScrollToTop from '../ScrollToTop';

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
		marginBottom: theme.spacing(2),
		textTransform: 'capitalize',
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#ff4040'
		}
	},
	grid:
	{
		marginBottom: '70px',
		[theme.breakpoints.down("sm")]:
		{
			paddingTop: '40px'
		}
	},
	item1: {order: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'},
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
		display: 'flex', flexDirection: 'column', alignItems: 'center',
		order: 4,
		[theme.breakpoints.down("sm")]:
		{
			order: 3
		}
	},
	item5: {order: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'},
	item6: {order: 6},
	divider: 
	{
        height: theme.spacing(.1),
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(1)
    }
});

const logoTheme = createMuiTheme({
	typography: {allVariants: {fontFamily:`"Dancing Script", sans-serif`}}
});

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
			lineHeight: 1
		},
		h1:
		{
			fontFamily: `"Caveat", sans-serif`,
			'@media (max-width: 300px)':
			{
				fontSize: '80px'
			}
		},
		h3:
		{
			fontFamily: `"Caveat", sans-serif`,
		},
		h4:
		{
			fontWeight: "bold"
		},
		h5:
		{
			color: 'white',
			fontWeight: 'bold',
			textShadow: '3px 3px black',
			letterSpacing: '1.5px'
		},
		subtitle1:
		{
			fontSize: "20px",
			lineHeight: 1.4,
			width: '65%'
		}
	}
});

function HomePage(props) {
	const { classes } = props;

	return (
		<>
		<Navbar />
		<ScrollToTop />
		<Container>
			<Helmet><title>Portfolio Plus | Home</title></Helmet>
			<HeroContianer data-aos="zoom-in-up">
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
				<Subtext>
					Having trouble? <HelpLink to="/questions-and-answers">Get some help!</HelpLink>	
				</Subtext>
			</HeroContianer>
			<FixedBackground id="about">
				<MuiThemeProvider theme={theme}>
					<Typography variant="h5">
						What is Portfolio Plus?
					</Typography>
				</MuiThemeProvider>
			</FixedBackground>
			<ParagraphWrapper>
				<Paragraph>
					Portfolio Plus is a free service for creating a designed landing page with
					all of your personal projects and works.
				</Paragraph>
				<Paragraph>
					The idea was born out of a need to unify all projects in one place, 
					which will be a slightly less generic and banal way as in a resume, 
					but in a readable, colorful and eye-catching way.
				</Paragraph>
				<Paragraph>
					The website allows you to create an unique and personal landing page that 
					contains the projects that you've done, which you can share and send to anyone you want.
				</Paragraph>
			</ParagraphWrapper>
			<FixedBackground id="services">
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
				alignItems="center"
				alignContent="center">
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item1}>
						<MuiThemeProvider theme={theme}>
							<Typography variant="h4" gutterBottom>
								It's easy to use and manage
							</Typography>
							<Typography variant="subtitle1">
								With just few clicks, you can create a colorful landing page and 
								add, edit and delete projects.<br />
								Send just one link to anyone you'd like to share your projects with!
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
								It saves precious time
							</Typography>
							<Typography variant="subtitle1">
								Creating any project can take some time.<br />
								With using Portfolio Plus, you don't need to search for a
								a place to share your works and project, they're all located in one place
							</Typography>
						</MuiThemeProvider>
					</Grid>
					{/*---*/}
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item5}>
						<MuiThemeProvider theme={theme}>
							<Typography variant="h4" gutterBottom>
								It can impress potential employers
							</Typography>
							<Typography variant="subtitle1">
								If you're an inexperienced employee, a portfolio is a "Business Card" for your skills.<br />
								Attached your link to your resume or send it to employers, so they'll see your works.
							</Typography>
						</MuiThemeProvider>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item6}>
						<Picture src={Vector3} alt="Vector3" />
					</Grid>
			</Grid>
			<Footer to='/'/>
			{/*<Footer>
				<Logo to='/'onClick={() => scroll.scrollToTop()}>
					<motion.div
						whileHover={{ scale: 1.25 }}
						transition={{ type: "spring", stiffness: 500 }}
						style={{display: 'flex', alignItems: 'center'}}>
						<MuiThemeProvider theme={logoTheme}>
							<Typography variant="h4">
								Portfolio +
							</Typography>
						</MuiThemeProvider>
					</motion.div>
				</Logo>
				<MuiThemeProvider theme={theme}>
						<Typography variant="subtitle2" gutterBottom>
							Creating a portfolio has never been easier
						</Typography>
					</MuiThemeProvider>
				<Divider variant="middle" className={classes.divider} />
				<LinksContainer>
					<motion.div
						whileHover={{ rotateZ: 10, scale: 1.25 }}
						transition={{ type: "spring", stiffness: 500 }}
						style={{display: 'flex', alignItems: 'center'}}>
						<FooterLink to='/questions-and-answers'>Help</FooterLink>
					</motion.div>
					<motion.div
						whileHover={{ rotateZ: 10, scale: 1.25 }}
						transition={{ type: "spring", stiffness: 500 }}
						style={{display: 'flex', alignItems: 'center'}}>
						<FooterLink to='/credits'>Credits</FooterLink>
					</motion.div>
					<motion.div
						whileHover={{ rotateZ: -10, scale: 1.25 }}
						transition={{ type: "spring", stiffness: 500 }}
						style={{display: 'flex', alignItems: 'center'}}>
						<FooterLink to='/register'>Regitser</FooterLink>
					</motion.div>
					<motion.div
						whileHover={{ rotateZ: -10, scale: 1.25 }}
						transition={{ type: "spring", stiffness: 500 }}
						style={{display: 'flex', alignItems: 'center'}}>
						<FooterLink to='/login'>Login</FooterLink>
					</motion.div>
				</LinksContainer>
				<MuiThemeProvider theme={theme}>
					<Typography variant="subtitle2" gutterBottom>
						Coded with <Emoji text=":heart:" style={{fontSize: "18px"}}/> by Tsahi Barshavsky
					</Typography>
					<Typography variant="subtitle2" gutterBottom>
						All rights reserved &copy; {new Date().getFullYear()}
					</Typography>
				</MuiThemeProvider>
			</Footer>*/}
		</Container>
		</>
	)
}

export default withStyles(styles)(HomePage);