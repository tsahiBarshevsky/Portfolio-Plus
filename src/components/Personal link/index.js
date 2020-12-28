import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import GenericPhoto from '../../images/person-circle-outline.svg';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import "./style.css";
import { Root, TextWrapper, TopLine } from './PersonalLinkElements';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        [theme.breakpoints.down("xs")]:
        {
            width: theme.spacing(14),
            height: theme.spacing(14),
        }
    },
    divider: {
        height: theme.spacing(.3),
        backgroundColor: 'black'
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
            fontSize: '25px'
        }
	}
});

function PersonalLink(props) {
    const [projects, setProjects] = useState([]);
    const [userInfo, setUserInfo] = useState('');
    const [url, setUrl] = useState('');
    const classes = useStyles();

    useEffect(() =>
    {
        getImageURL();
        firebase.getAllProjects(props.match.params.username).then(setProjects);
        firebase.getUserInfo(props.match.params.username).then(setUserInfo);
    }, []);

    /*if (projects.length < 1)
    {
        props.history.replace('/');
		return null;
    }*/

    function Item(props) 
    {
        const [isOpen, setIsOpen] = useState(false);
        const toggleOpen = () => setIsOpen(!isOpen);
      
        return (
            <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
                <motion.div layout >
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h4" gutterBottom>
                            {projects[props.location].title}
                        </Typography>
                    </MuiThemeProvider>
                </motion.div>
                <AnimatePresence>{isOpen && <Content location={props.location} />}</AnimatePresence>
            </motion.li>
        );
    }
      
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
                        {projects[props.location].links.map((link, index) =>
                            <a href={link} target="_blank">{`link #${index+1}`}</a>
                        )}
                        <div className="videoConainer">
                            <iframe className="video"
                                src={projects[props.location].video}
                                frameborder="0"
                                allowFullScreen
                                allow="accelerometer; 
                                        autoplay; encrypted-media; 
                                        gyroscope; picture-in-picture;" />
                        </div>
                    </div>
            </motion.div>
        );
    }


    /*main*/
    return (
        <Root>
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
            <AnimateSharedLayout>
                <motion.ul layout initial={{ borderRadius: 25 }}>
                    {projects.map((project, index) =>
                        <Item key={project} location={index} />
                    )} 
                </motion.ul>
            </AnimateSharedLayout>
            : `${props.match.params.username} has no projects yet`}
        </Root>
    )

    async function getImageURL()
	{
		var username = props.match.params.username;
		firebase.storage.ref("Profile images").child(username).getDownloadURL().then(
			url => {setUrl(url);}
		);
	}
}

export default PersonalLink;
