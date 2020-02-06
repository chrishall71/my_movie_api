import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(username, password);
		//Send a request to the server for authentication
		props.onLoggedIn(username)
	};

	return (
		<Form className="login-form">
			<h1 className='text-center'>
				<span className="font-weight-bold">MyFlix</span> Movies
			</h1>
			<h2 className='text-center'>Welcome</h2>
			<Form.Group controlId='formBasicUsername'>
				<Form.Label className="text-center">Username</Form.Label>
				<Form.Control
					type="text"
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)} />
			</Form.Group>
			<Button
				className='btn-lg btn-dark btn-block'
				type='submit'
				onClick={handleSubmit}>Log in</Button>
			<br></br>
			<br />

			<Form.Group controlId='newUser'>
				<Form.Text>New User? Click <Button className='btn-sm btn' id='registerButton' onClick={() => props.onClick()}> Register </Button>
				</Form.Text>
			</Form.Group>
		</Form>
	);
}

