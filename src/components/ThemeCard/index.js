import React from 'react';
import firebase from '../firebase';
import { Container } from './ThemeCardElements';

function ThemeCard(props) {
    var style;
    if (props.theme === props.selectedTheme)
        style = {border: "2px solid black"}
    else
        style = {border: "none"}
    
    return (
        <>
            <Container style={style} onClick={updateUserTheme}>
                {props.theme}
            </Container>
        </>
    );
    
    async function updateUserTheme() 
    {
        try 
        {
            await firebase.updateUserTheme(props.theme, props.username);
            props.setSelectedTheme(props.theme);
            alert("change successfully");
        } 
        catch (error) 
        {
            alert(error.message);
        }
    }
}

export default ThemeCard;
