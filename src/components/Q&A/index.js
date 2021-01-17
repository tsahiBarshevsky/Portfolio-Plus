import React, { useState } from 'react';
import { Answer, Container, InnerContainer, MailTo, Question, TextWrapper } from './QAElements';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, IconButton, Typography, Divider } from '@material-ui/core';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { grey, red } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Footer from '../Footer';
import ScrollToTop from '../ScrollToTop';
import Emoji from 'react-emoji-render';

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
    expanded: 
    {
        color: '#ff4040',
        transition: 'all 0.5s ease-in-out'
    }
}));

const theme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Andika New Basic", sans-serif` },
        body1: { fontSize: '18.5px' },
        h3: { textShadow: '0px 3px rgba(255, 64, 64, 0.7)', paddingTop: '35px' },
        h5: { paddingBottom: '55px' },
        h6: { fontWeight: 600 },
        subtitle1: { color: red[900], lineHeight: 1.2 }
	}
});

function QuestionsAndAnswers() {
    const classes = useStyles();
    const style = { display: 'flex', flexDirection: 'column' };
    
    return (
        <Container>
            <Helmet><title>Portfolio Plus | Q&A</title></Helmet>
            <ScrollToTop />
            <InnerContainer>
                <TextWrapper>
                    <MuiThemeProvider theme={theme}>
                        <Typography align="center" variant="h3" gutterBottom>
                            Questions & Answers
                        </Typography>
                        <Typography align="center" variant="h5">
                            <b>Don't get entangled!</b> <br />
                            Everything you need to know about using this site is here <Emoji text=":point_down:" style={{fontSize: "18px"}} />
                        </Typography>
                    </MuiThemeProvider>
                </TextWrapper>
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
                                Portfolio Plus is a free service for creating a designed landing page with
                                all of your personal projects and works.
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
                                    Who can use it?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                            The site is appropriate for any job seeker who is interested in presenting a portfolio.
                            For example programmers or designers.
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
                                    How does it work?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                The site is easy and convenient to use. Sign up with an email and password
                                and you can immediately create as many projects as you want. 
                                An explanation for registering and logging can be found below.
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
                                    Does using the site cost money?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                No, using the site is completely free.
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
                                    How to register and login into an account?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails style={style}>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                Registration requires providing a valid email account, username (which will be a unique identifier for your page), 
                                profession and password. <br />
                                The username and profession you provided, will be displayed on your personal page. <br />
                                To log in, you have to enter the email and password you used to sign in to the site.
                            </Typography>
                            <br /><br />
                            <Typography variant="subtitle1">
                                Note: The username should be unique. But don't worry, if you enter a username 
                                that is used by another user, you will get an alert.
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
                                    Is it possible to change account information?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                You can only update your profession. The username is used as a unique identifier, 
                                so it cannot be changed after registration.
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
                                    How to update the information that can be changed?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                On the settings page. It can be accessed using the side menu that appears by 
                                clicking the arrow on the left side of the top bar.
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
                                    What is the dashboard and what is it used for?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                The dashboard is where all the magic happens. 
                                It contains stats about your account, such as the number of projects 
                                you've added, different types of projects and the last date you updated 
                                your account. <br />
                                In addition, in the dashboard you can add new projects, 
                                edit and delete existing projects. <br />
                                An explanation of adding, editing and deleting a project can be found below.
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
                                    How to add a new project?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails style={style}>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                Once logged in, the system will redirect you to your dashboard. 
                                In the lower-right corner, you will see a button with the plus icon, 
                                clicking on it will open a dialog for adding a new project.
                                To add a new project, three fields must be provided: 
                                title, type and description. Additionally, you can add up to three links
                                and a link to a YouTube video.
                            </Typography>
                            <br /><br />
                            <Typography variant="subtitle1">
                                Note: The title is unchangeable after adding the project.
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
                                    How to edit/delete an existing project?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails style={style}>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                After adding the first project, you can see a table containing information 
                                about all the projects you've uploaded. Next to each project, there are two 
                                buttons: Edit a project and Delete.
                                Clicking the edit button opens a dialog containing the values of the same
                                project, which can be edited.
                            </Typography>
                            <br /><br />
                            <Typography variant="subtitle1">
                                Note: You can't add/delete link to an existing project.
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
                                   Is there any limit on the amount of projects?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                No, the only limitation on the site is the profile picture.
                                You can upload an image that weighs less than 5 MB, preferably
                                a 1:1 ratio.
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
                                    How to design the personal page?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                On the settings page. On this page you can set the background 
                                that will be on your page and upload a profile picture.
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
                                   How to get to the personal page? 
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                The settings page has a direct link to your page.
                                In addition, it can be accessed through the address 
                                bar by entering the URL with "/your-username". <br />
                                For example: {`${window.location.origin.toString()}/user1`}.
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
                                    How to share my personal page?
                                </Typography>
                            </MuiThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MuiThemeProvider theme={theme}>
                            <Typography>
                                The page itself has four buttons for sharing the page in different places: 
                                Facebook, LinkedIn, Telegram and WhatsApp. <br />
                                In addition, of course, you can send the URL itself to anyone you want to share with.
                            </Typography>
                        </MuiThemeProvider>
                    </AccordionDetails>
                </Accordion>
                <MuiThemeProvider theme={theme} >
                    <Typography align="center" variant="h6" style={{paddingTop: '20px'}}>
                        If you still have questions, you can <MailTo href="mailto:tsahi.13@gmail.com">email me</MailTo>!
                    </Typography>
                </MuiThemeProvider>
            </InnerContainer>
            <Footer to='/questions-and-answers'/>
        </Container>
    )
}

export default QuestionsAndAnswers;
