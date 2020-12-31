import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Root, TextWrapper, TopLine, ListWrapper, ProjectsList, Project, VideoContainer, Video, Links, Link, Title } from './PersonalLinkElements';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(19),
        height: theme.spacing(19),
        boxShadow: '0px 0px 23px 0px rgba(0,0,0,0.75)',
        //border: '5px double black',
        [theme.breakpoints.down("xs")]:
        {
            width: theme.spacing(14),
            height: theme.spacing(14),
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
        }
    }
}));

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
            fontFamily: `"Andika New Basic", sans-serif`,
        },
        h4:
        {
            fontSize: '25px',
        },
        subtitle1:
        {
            lineHeight: 1.2
        }
	}
});

function PersonalLink(props) {
    
    /*card in close mode*/
    function Item(props) 
    {
        const [isOpen, setIsOpen] = useState(false);
        const toggleOpen = () => setIsOpen(!isOpen);
        const stayOpen = () => setIsOpen(true);
      
        return (
            <Project layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
                <motion.div layout>
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h4" gutterBottom>
                            {projects[props.location].title}
                        </Typography>
                    </MuiThemeProvider>
                </motion.div>
                <AnimatePresence>{isOpen && <Content location={props.location} stayOpen={stayOpen} />}</AnimatePresence>
            </Project>
        );
    }
      
    /*card content - open mode*/
    function Content(props) 
    {
        return (
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                    <div>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="subtitle1" gutterBottom>
                                {`Type: ${projects[props.location].type}`}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {projects[props.location].description}
                            </Typography>
                            <Typography variant="subtitle1">
                                <u>Links</u>
                                <br />
                            </Typography>
                        </MuiThemeProvider>
                        <Links>
                        {projects[props.location].links.map((link, index) =>
                            <li key={index}>
                                <Link href={link} target="_blank">{`link #${index+1}`}</Link>
                            </li>
                        )}
                        </Links>
                        <VideoContainer>
                            <Video src={projects[props.location].video}
                                frameborder="0"
                                allowFullScreen
                                allow="accelerometer; 
                                        autoplay; encrypted-media; 
                                        gyroscope; picture-in-picture;" />
                        </VideoContainer>
                    </div>
            </motion.div>
        );
    }

    const [projects, setProjects] = useState([]);
    const [userInfo, setUserInfo] = useState('');
    const [url, setUrl] = useState('');
    const [background, setBackground] = useState('');
    console.log(background);
    var style;
    const classes = useStyles();

    useEffect(() =>
    {
        getImageURL();
        firebase.getAllProjects(props.match.params.username).then(setProjects);
        firebase.getUserInfo(props.match.params.username).then(setUserInfo);
    }, []);

    if (userInfo.background !== 'default')
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
        <Root style={style}>
            <TopLine>
                <MuiThemeProvider theme={theme}>
                    <TextWrapper>
                        <Typography variant="h3" >
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
            {projects.length >= 1 ?
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
        </Root>
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
