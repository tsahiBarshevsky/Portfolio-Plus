import React, { useState, useEffect } from 'react'
import firebase from '../firebase'

function Show(props) 
{
    const [projects, setProjects] = useState([]);

    useEffect(() =>
    {
        firebase.getAllProjects(props.match.params.username).then(setProjects);
        console.log("stam");
    }, []);

    /*if (projects.length < 1)
    {
        props.history.replace('/');
		return null;
    }*/

    return (
        <div>
            {projects.length > 1 ?
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
}

export default Show
