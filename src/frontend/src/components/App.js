import React, { Component, useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import HomePage from "./HomePage";
import AccountRouter from "./accounts/AccountRouter";

import './css/styles.css';

export default function App(props) {

	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)
	const [username, setUsername] = useState('')

	useEffect(() => {
		if (loggedIn) {
			fetch('/accountsAPI/current-user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(res => res.json())
				.then(json => {
					if (json.username) {
						setUsername(json.username)
					}
					else {
						handleLogout()
					}
				});
		}
	});

	const handleLogout = () => {
		localStorage.removeItem('token');
		setLoggedIn(false)
		setUsername('')
	};

	return (
		<div>
			<p className='title'>{username}</p>
			<Router>
				<Switch>
					<Route path='/accounts'>
						<p>Accounts page</p>
						<AccountRouter />
					</Route>
					<Route path=''>
						<HomePage />
					</Route>
				</Switch>

			</Router>
		</div>
	)
}