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

    return (
        <div>
            {projects.map((project, index) =>
                <div key={index}>
                    <h1>{project.title}</h1>
                    <h3>{project.type}</h3>
                    <h3>{project.description}</h3>
                    <h3>{project.links}</h3>
                    <h3>{project.video}</h3>
                </div>
            )}
        </div>
    )
}

export default Show
