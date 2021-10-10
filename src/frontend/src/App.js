import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
// import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayed_form: '',
			logged_in: localStorage.getItem('token') ? true : false,
			username: ''
		};
	}

	componentDidMount() {
		if (this.state.logged_in) {
			fetch('users/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(res => res.json())
				.then(json => {
					this.setState({ username: json.username });
				});
		}
	}

	handle_login = (e, data) => {
		e.preventDefault();
		fetch('token-auth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
					displayed_form: '',
					username: json.user.username
				});
			});
	};

	test(){
		fetch('users/test/', {
			method: 'GET',
			headers: {
				Authorization: `JWT ${localStorage.getItem('token')}`
			}
		})
	};


	handle_signup = (e, data) => {
		e.preventDefault();
		fetch('users/users/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
					displayed_form: '',
					username: json.username
				});
			});
	};

	handle_logout = () => {
		localStorage.removeItem('token');
		this.setState({ logged_in: false, username: '' });
	};

	display_form = form => {
		this.setState({
			displayed_form: form
		});
	};

	render() {
		let form;
		switch (this.state.displayed_form) {
			case 'login':
				form = <LoginForm handle_login={this.handle_login} />;
				break;
			case 'signup':
				form = <SignupForm handle_signup={this.handle_signup} />;
				break;
			default:
				form = null;
		}

		return (
			<div className="App">
				<button onClick={this.test}>test</button>
				<Nav
					logged_in={this.state.logged_in}
					display_form={this.display_form}
					handle_logout={this.handle_logout}
				/>
				{form}
				<h3>
					{this.state.logged_in
						? `Hello, ${this.state.username}`
						: 'Please Log In'}
				</h3>
			</div>
		);
	}
}

export default App;