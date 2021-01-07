import React, { useState } from 'react';
import firebase from '../firebase';
import { Container } from './ThemeCardElements';
import { Typography, Snackbar } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import bg1 from '../../images/Backgrounds/bg1.png';
import bg2 from '../../images/Backgrounds/bg2.png';
import bg3 from '../../images/Backgrounds/bg3.png';
import bg4 from '../../images/Backgrounds/bg4.png';
import bg5 from '../../images/Backgrounds/bg5.png';

const typographyTheme = createMuiTheme({
	typography:
	{
		allVariants:
		{
            fontFamily: `"Andika New Basic", sans-serif`,
            lineHeight: 1.1
		}
	}
});

function ThemeCard(props) {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState('');

    const Alert = (props) =>
    {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    const closeSnackbar = () =>
	{
		setOpenError(false);
		setOpenSuccess(false);
	}

    var selected, background; //styles
    var name = ''; //present the name to user instead of bg1, bg2 etc...
    if (props.theme === props.selectedTheme)
        selected = {border: "2px solid black", cursor: "not-allowed"};
    else
        selected = {border: "none"};

    switch(props.theme)
    {
        case 'bg1':
            background = {background: 'url(' + bg1 + ')'};
            name = 'Blue comic';
            break;
        case 'bg2':
            background = {background: 'url(' + bg2 + ')'};
            name = 'Blue and purple gradient';
            break;
        case 'bg3':
            background = {background: 'url(' + bg3 + ')'};
            name = 'Red comic';
            break;
        case 'bg4':
            background = {background: 'url(' + bg4 + ')'};
            name = 'Colorful shapes';
            break;
        case 'bg5':
            background = {background: 'url(' + bg5 + ')'};
            name = 'Brush strokes';
            break;
        default:
            name = 'default';
            background = {background: '#f5f5f5'};
    }

    return (
        <>
            <Container style={{...selected, ...background}} onClick={updateUserTheme}>
                <MuiThemeProvider theme={typographyTheme}>
                    <Typography variant="h6" align="center">
                        {name}
                    </Typography>
                </MuiThemeProvider>
                <Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity="success">
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="subtitle2">
								{`change successfully to ${name}`}
							</Typography>
						</MuiThemeProvider>
					</Alert>
				</Snackbar>
				<Snackbar open={openError} autoHideDuration={3500} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity="error">
						<MuiThemeProvider theme={typographyTheme}>
							<Typography align="center" variant="subtitle2">
								{error}
							</Typography>
						</MuiThemeProvider>
					</Alert>
				</Snackbar>
            </Container>
        </>
    );
    
    async function updateUserTheme() 
    {
        if (props.theme !== props.selectedTheme)
        {
            try 
            {
                await firebase.updateUserTheme(props.theme, props.username);
                props.setSelectedTheme(props.theme);
                setOpenSuccess(true);
            } 
            catch (error) 
            {
                setError(error.message);
                setOpenError(true);
            }
        }
    }
}

export default ThemeCard;
