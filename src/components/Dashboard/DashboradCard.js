import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Container, Content, Title } from './DashboardCardElements';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
            fontFamily: `"Andika New Basic", sans-serif`,
        },
        h6: {color: grey[50]},
        h4: {color: grey[600]}
	}
});

function DashboradCard(props) {

    const renderIcon = () =>
    {   
        const style = {color: grey[50], fontSize: '30px'};
        switch (props.title)
        {
            case 'Number of projects':
                return <EqualizerIcon style={style} />
        }
    }

    return (
        <Container>
            <Title>
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h6">{props.title}</Typography>
                </MuiThemeProvider>
                {renderIcon()}
            </Title>
            <Content>
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h4">{props.content}</Typography>
                </MuiThemeProvider>
            </Content>
        </Container>
    )
}

export default DashboradCard;
