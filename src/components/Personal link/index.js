import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import GenericPhoto from '../../images/person-circle-outline.svg';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import "./style.css";

function PersonalLink(props) {
    const [projects, setProjects] = useState([]);
    const [url, setUrl] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() =>
    {
        //getImageURL();
        firebase.getAllProjects(props.match.params.username).then(setProjects);
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
                    <h3>{projects[props.location].title}</h3>
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
                        <h3>{projects[props.location].type}</h3>
                        <h3>{projects[props.location].description}</h3>
                        <ol>
                            {projects[props.location].links.map(link =>
                                <li>
                                    <a href={link} target="_blank">go</a>
                                </li>
                            )}
                        </ol>
                        <div className="videoConainer">
                            <iframe className="video"
                                src={projects[props.location].video}
                                width="50" height="40"
                                frameborder="0"
                                allowfullscreen
                                allow="accelerometer; 
                                        autoplay; encrypted-media; 
                                        gyroscope; picture-in-picture" />
                            </div>
                    </div>
            </motion.div>
        );
    }

    return (
        <div>
            <AnimateSharedLayout>
                <motion.ul layout initial={{ borderRadius: 25 }}>
                {projects.length >= 1 ?
                projects.map((project, index) =>
                    <Item key={project} location={index} />
                ) : "User doesn't exists"}
                </motion.ul>
            </AnimateSharedLayout>
            
            {/*<img src={url !== '' ? url : GenericPhoto} alt="User image" width="100px"/>
            {projects.length >= 1 ?
            projects.map((project, index) =>
                <div key={index}>
                    <h1>{project.title}</h1>
                    <h3>{project.type}</h3>
                    <h3>{project.description}</h3>
                    <ol>
                        {project.links.map(link =>
                            <li>
                                {link}
                            </li>
                        )}
                    </ol>
                    <h3>{project.video}</h3>
                </div>
            ) : "User doesn't exists"}*/}
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
