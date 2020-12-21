import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import GenericPhoto from '../../images/person-circle-outline.svg';

function Show(props) 
{
    const [projects, setProjects] = useState([]);
    const [url, setUrl] = useState('');

    useEffect(() =>
    {
        getImageURL();
        firebase.getAllProjects(props.match.params.username).then(setProjects);
    }, []);

    /*if (projects.length < 1)
    {
        props.history.replace('/');
		return null;
    }*/

    return (
        <div>
            <img src={url !== '' ? url : GenericPhoto} alt="User image" width="100px"/>
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
            ) : "User doesn't exists"}
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

export default Show;
