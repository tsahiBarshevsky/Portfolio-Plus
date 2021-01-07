import React, { useState, useEffect } from 'react';
import HomePage from '../HomePage';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from '../firebase';
import './style.css';
import PersonalLink from '../Personal link';
import Settings from '../Settings';
import QuestionsAndAnswers from '../Q&A';

const theme = createMuiTheme();

export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false);

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		});
	});


	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/settings" component={Settings} />
					<Route exact path="/questions-and-answers" component={QuestionsAndAnswers} />
					<Route exact path="/:username" component={PersonalLink} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	) : <div id="loader"><CircularProgress /></div>
}