import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Container, LinksContainer, FooterLink, Logo } from './FooterElements';
import { motion } from "framer-motion";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import Emoji from "react-emoji-render";
import { animateScroll as scroll } from 'react-scroll';

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

function Footer(props) {
    const { classes } = props;

    return (
        <Container>
            <Logo to={props.to} onClick={() => scroll.scrollToTop()}>
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
        </Container>
    )
}

export default withStyles(styles)(Footer);
