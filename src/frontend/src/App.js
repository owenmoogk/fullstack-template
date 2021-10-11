import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'

export default function App(props) {

	const [username, setUsername] = useState()
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)

	useEffect(() => {
		console.log(loggedIn)
		if (loggedIn) {
			fetch('/users/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(res => res.json())
				.then(json => {
					setUsername(json.username)
				});
		}
	})

	function test() {
		fetch('/users/current_user/', {
			headers: {
				Authorization: `JWT ${localStorage.getItem('token')}`
			}
		})
	}

	function handleLogout() {
		localStorage.removeItem('token');
		setLoggedIn(false)
		setUsername('')
	};

	return (

		<Router>
			<button onClick={test}>test</button>
			<Nav
				loggedIn={loggedIn}
				handleLogout={handleLogout}
			/>
			<Switch>
				<Route path="/login">
					<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
				</Route>
				<Route path="/signup">
					<Signup setLoggedIn={setLoggedIn} setUsername={setUsername} />
				</Route>
				<Route path=''>
					<h3>
						{loggedIn
							? `Hello, ${username}`
							: 'Not logged in'}
					</h3>
				</Route>
			</Switch>
		</Router>
	);
}