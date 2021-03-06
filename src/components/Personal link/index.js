import React, { useState, useEffect } from 'react';
import { Link as LinkR } from 'react-router-dom';
import firebase from '../firebase';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { 
    Root, TextWrapper, TopLine, ListWrapper, ProjectsList, Project, VideoContainer,
    Video, Links, Link, ErrorLogo, ErrorRoot, PulseBubble1, PulseBubble2, PulseBubble3,
    PulseContainer, SocialIcons, BackHome, LinksLi } from './PersonalLinkElements';
import { Helmet } from "react-helmet";
import {FacebookShareButton, LinkedinShareButton, TelegramShareButton, WhatsappShareButton,
        FacebookIcon, LinkedinIcon, TelegramIcon, WhatsappIcon} from 'react-share';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        boxShadow: '0px 0px 23px 0px rgba(0, 0, 0, 0.75)',
        border: '5px double black',
        [theme.breakpoints.down("xs")]:
        {
            width: theme.spacing(15),
            height: theme.spacing(15),
            marginBottom: theme.spacing(1.5)
        }
    },
    divider: {
        height: theme.spacing(.3),
        width: '785px',
        alignSelf: 'center',
        backgroundColor: 'black',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down("sm")]:
        {
            width: '550px'
        },
        [theme.breakpoints.down("xs")]:
        {
            width: '315px'
        },
        ["@media (max-width: 330px)"]:
        {
            width: '215px'
        }
    },
    social: 
    {
        margin: theme.spacing(1),
        filter: 'drop-shadow(2px 2px 3px black)'
    },
    button: 
	{
		color: '#ff4040',
		fontSize: '18px',
		fontWeight: '600',
		letterSpacing: '1px',
		border: '3px solid #ff4040',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		marginTop: theme.spacing(1),
		textTransform: 'capitalize',
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#ff4040'
		}
	}
}));

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Andika New Basic", sans-serif` },
        h4: { fontSize: '25px' },
        h6: { lineHeight: 1.35, paddingBottom: '20px', paddingTop: '10px' },
        subtitle1: { fontWeight: 'bold', lineHeight: 1.2 }
	}
});

const logoTheme = createMuiTheme({
    typography: {allVariants: {fontFamily: `"Dancing Script", sans-serif`}}
});

const topLineTheme = createMuiTheme({
    typography: 
    {
        allVariants: 
        {
            fontFamily: `"Andika New Basic", sans-serif`
        },
        h3:
        {
            [defaultTheme.breakpoints.down("xs")]:
            {
                textAlign: 'center',
                fontSize: '35px'
            }
        },
        h4:
        {
            fontSize: '25px',
            [defaultTheme.breakpoints.down("xs")]:
            {
                textAlign: 'center',
                fontSize: '20px'
            }
        },
        subtitle1:
        {
            lineHeight: 1.2,
            [defaultTheme.breakpoints.down("xs")]:
            {
                textAlign: 'center'
            }
        }
    }
});

function PersonalLink(props) {
    
    /*card in close mode*/
    function Item(props) 
    {
        const [isOpen, setIsOpen] = useState(false);
        const toggleOpen = () => setIsOpen(!isOpen);
      
        return (
            <Project layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
                <motion.div layout>
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h4">
                            {projects[props.location].title}
                        </Typography>
                    </MuiThemeProvider>
                </motion.div>
                <AnimatePresence>{isOpen && <Content location={props.location} />}</AnimatePresence>
            </Project>
        );
    }
      
    /*card content - open mode*/
    function Content(props) 
    {
        const [width, setWidth] = useState(window.innerWidth);;

        useEffect(() => {
            const updateWindowDimensions = () => 
            {
                const newWidth = window.innerWidth;
                setWidth(newWidth);
            };
            window.addEventListener("resize", updateWindowDimensions);
            return () => window.removeEventListener("resize", updateWindowDimensions) 
        }, []);

        //break the link if it's too big
        const rednerLink = (link) =>
        {
            var x = [], y = [];
            var http = link.substring(0, 8);
            var other = link.slice(8, link.length);
            other.split(/[/]/).map(i => {x.push(i)});
            var res = x.join('/\n');
            res.split(/[=]/).map(i => {y.push(i)});
            return `${http}${y.join('=\n')}`;
        }

        return (
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                    <div>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="subtitle1" gutterBottom
                                style={{paddingTop: '10px'}}>
                                {`${projects[props.location].type}`}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {projects[props.location].description}
                            </Typography>
                        </MuiThemeProvider>
                        {projects[props.location].links !== null ?
                        <>
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <u>Links</u>
                                </Typography>
                            </MuiThemeProvider>
                            <Links>
                            {projects[props.location].links.map((link, index) =>
                                <LinksLi key={index}>
                                    <Link href={link} target="_blank">
                                        {width < 600 ? rednerLink(link):link}
                                    </Link>
                                </LinksLi>
                            )}
                            </Links>
                        </>
                         : null }
                        {projects[props.location].video !== null ? 
                        <VideoContainer>
                            <Video src={projects[props.location].video}
                                frameborder="0"
                                allowFullScreen
                                allow="accelerometer; 
                                        autoplay; encrypted-media; 
                                        gyroscope; picture-in-picture;" />
                        </VideoContainer> : null }
                    </div>
            </motion.div>
        );
    }

    const [projects, setProjects] = useState([]);
    const [userInfo, setUserInfo] = useState('');
    const [url, setUrl] = useState('');
    const [background, setBackground] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [help, setHelp] = useState(false);
    const [fault, setFault] = useState(false);
    //const [width, setWidth] = useState(window.innerWidth);
    //console.log(width);
    
    var style;
    const classes = useStyles();

    useEffect(() =>
    {
        firebase.getUserInfo(props.match.params.username).then(setUserInfo);
        /*const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };*/
    }, []);

    if (userInfo === null && !fault) setFault(true);

    if (userInfo && !isLoad)
    {
        setTimeout(() => { setHelp(true); }, 500);
        setIsLoad(true);
        getImageURL();
        firebase.getAllProjects(props.match.params.username).then(setProjects);
    }

    if (userInfo && userInfo.background !== 'default')
    {
        getBackgroundURL();
        style = {
            background: "linear-gradient(rgba(255, 255, 255, 0.6) 2%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.6) 98%), url(" + background + ") no-repeat center center"
        }
    }
    else
        style = {background: "#f5f5f5"}

    /*main*/
    return (
        <>
            {isLoad && help ? 
            <Root style={style}>
                <Helmet><title>{`Portfolio Plus | @${props.match.params.username}`}</title></Helmet>
                <TopLine>
                    <MuiThemeProvider theme={topLineTheme}>
                        <TextWrapper>
                            <Typography variant="h3">
                                {`${props.match.params.username}`}
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                {`${userInfo.profession}`}
                            </Typography>
                            <Typography variant="subtitle1">
                                {`Last update: ${userInfo.lastUpdate}`}
                            </Typography>
                        </TextWrapper>
                    </MuiThemeProvider>
                    <Avatar src={url !== '' ? url : null} alt="Profile picture" className={classes.avatar} />
                </TopLine>
                <Divider variant="middle" className={classes.divider} />
                <SocialIcons>
                    <motion.div layout
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}>
                        <FacebookShareButton
                            className={classes.social}
                            url={window.location.href}
                            quote={"Hey, check out my projects!"}>
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>
                    </motion.div>
                    <motion.div layout
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}>
                        <LinkedinShareButton
                            className={classes.social}
                            url={window.location.href}>
                            <LinkedinIcon size={40} round />
                        </LinkedinShareButton>
                    </motion.div>
                    <motion.div layout
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}>
                        <TelegramShareButton
                            className={classes.social}
                            url={window.location.href}>
                            <TelegramIcon size={40} round />
                        </TelegramShareButton>
                    </motion.div>
                    <motion.div layout
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}>
                        <WhatsappShareButton
                            className={classes.social}
                            url={window.location.href}
                            quote={"Hey, check out my projects!"}>
                            <WhatsappIcon size={40} round />
                        </WhatsappShareButton>
                    </motion.div>
                </SocialIcons>
                {projects.length > 0 ?
                <ListWrapper>
                    <AnimateSharedLayout>
                        <ProjectsList layout initial={{ borderRadius: 25 }}>
                            {projects.map((project, index) =>
                                <Item key={index} location={index} />
                            )} 
                        </ProjectsList>
                    </AnimateSharedLayout>
                </ListWrapper>
                :
                <ListWrapper>
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h4" >
                            {`${props.match.params.username} has no projects yet`}
                        </Typography>
                    </MuiThemeProvider>
                </ListWrapper>}
                <BackHome to="/">
                    <MuiThemeProvider theme={logoTheme}>
                        <Typography variant="h4">
                            Portfolio +
                        </Typography>
                    </MuiThemeProvider>
                </BackHome>
            </Root> 
            :
            [(!fault ?
            <ErrorRoot>
                <PulseContainer>
                    <PulseBubble1 />
                    <PulseBubble2 />
                    <PulseBubble3 />
                </PulseContainer>
            </ErrorRoot> 
            :
            <ErrorRoot>
                <Helmet><title>Portfolio Plus | Page Not Found</title></Helmet>
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h4" align="center" gutterBottom>
                        {`Oops! The page you’re looking for doesn’t exist.`}
                    </Typography>
                </MuiThemeProvider>
                <Button to="/"
					variant="contained"
					component={LinkR}
					className={classes.button}>
						Back to homepage
				</Button>
                <ErrorLogo>
                    <MuiThemeProvider theme={logoTheme}>
                        <Typography variant="h4">
                            Portfolio +
                        </Typography>
                    </MuiThemeProvider>
                </ErrorLogo>
            </ErrorRoot>  
            )]}
        </>
    )

    async function getBackgroundURL()
    {
        firebase.storage.ref("Backgrounds").child(`${userInfo.background}.png`).getDownloadURL().then(
            url => {setBackground(url);}
        );
    }

    async function getImageURL()
	{
		var username = props.match.params.username;
		firebase.storage.ref("Profile images").child(username).getDownloadURL().then(
			url => {setUrl(url);}
		);
	}
}

export default PersonalLink;
