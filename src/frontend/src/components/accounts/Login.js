import React, { Component, useState } from "react";

function getCookie(name) {
	if (!document.cookie) {
		return null;
	}

	const xsrfCookies = document.cookie.split(';')
		.map(c => c.trim())
		.filter(c => c.startsWith(name + '='));

	if (xsrfCookies.length === 0) {
		return null;
	}
	return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

export default function Login() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()

    function handleLogin(e, data) {

        e.preventDefault();
        fetch('/accountsAPI/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.token) {
                    localStorage.setItem('token', json.token);
                    props.setLoggedIn(true)
                    props.setUsername(json.user.username)
                    window.location.replace('/')
                }
                else {
                    // https://www.geeksforgeeks.org/how-to-get-the-first-key-name-of-a-javascript-object/
                    var key;
                    for (var k in json) {
                        key = k;
                        break;
                    }
                    setMessage(json[key][0])
                }
            });

    }

    return (
        <form onSubmit={e => handleLogin(e, {username: username, password:password})}>
            <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
            <br />
            <input type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
            <input type='submit'></input>
            <p>{message}</p>
        </form>
    )
}