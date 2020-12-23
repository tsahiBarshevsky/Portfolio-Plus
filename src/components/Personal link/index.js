import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import GenericPhoto from '../../images/person-circle-outline.svg';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import "./style.css";

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
    const [profession, setProfession] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() =>
    {
        getImageURL();
        firebase.getAllProjects(props.match.params.username).then(setProjects);
        firebase.getUserProfession(props.match.params.username).then(setProfession);
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

    return (
        <div className="container">
            <img className="image" src={url} alt="User's image" />
            <MuiThemeProvider theme={theme}>
                <Typography variant="h3" gutterBottom>
                    {`${props.match.params.username} - ${profession}`}
                </Typography>
            </MuiThemeProvider>
            <AnimateSharedLayout>
                <motion.ul layout initial={{ borderRadius: 25 }}>
                {projects.length >= 1 ?
                projects.map((project, index) =>
                    <Item key={project} location={index} />
                ) : "User doesn't exists"}
                </motion.ul>
            </AnimateSharedLayout>
        </div>
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
