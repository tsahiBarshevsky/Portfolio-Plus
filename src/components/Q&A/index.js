import React, { useState } from 'react';
import { Answer, Container, InnerContainer, Question } from './QAElements';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, IconButton, Typography, Divider } from '@material-ui/core';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const useStyles = makeStyles((theme) => ({
    heading: 
    {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    expandIcon: 
    {
        "&$expanded": {transform: "rotate(90deg)"}
    },
    expanded: {}
}));

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`
        },
        h6:
        {
            fontWeight: 600
        }
	}
});

function QuestionsAndAnswers() {
    const classes = useStyles();
    
    return (
        <Container>
            <Helmet><title>Portfolio Plus | Q&A</title></Helmet>
            <InnerContainer>
                <Accordion>
                    <AccordionSummary
                        classes={{
                            expandIcon: classes.expandIcon,
                            expanded: classes.expanded
                        }}
                        expandIcon={<ExpandMoreIcon />}>
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="h6">
                                    What is Portfolio Plus?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </MuiThemeProvider>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        classes={{
                            expandIcon: classes.expandIcon,
                            expanded: classes.expanded
                        }}
                        expandIcon={<ExpandMoreIcon />}>
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="h6">
                                    How to register and login?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </MuiThemeProvider>
                    </AccordionDetails>
                </Accordion>
            </InnerContainer>
        </Container>
    )
}

export default QuestionsAndAnswers;
