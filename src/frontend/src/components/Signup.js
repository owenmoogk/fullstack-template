import React, { useState } from 'react';

export default function Signup(props) {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    function handleSignup(e) {
		e.preventDefault();
		fetch('/users/users/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username: username, password: password})
		})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('token', json.token);
				props.setLoggedIn(true)
				props.setUsername(json.user.username)
			});
	};

    return (
        <form onSubmit={e => handleSignup(e)}>
            <h4>Sign Up</h4>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input type="submit" />
        </form>
    );
}