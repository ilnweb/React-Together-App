import React from 'react';
import './sign-up.scss';
import { Button, Input, Form, Icon } from 'antd';
import { auth, createUserProfileDocument } from '../../firebase/firebase.config';

class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			await createUserProfileDocument(user, { displayName });
		} catch (error) {
			console.error(error);
		}
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className="sign-in-up flex-c-c">
				<h1>Sign Up</h1>
				<Form className="sign-in-up flex-c" onSubmit={this.handleSubmit}>
					<Input
						id="name"
						name="displayName"
						value={displayName}
						className="input-style"
						type="text"
            label="Name"
            size="large"
						placeholder="Name"
						onChange={this.handleChange}
						suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					/>
					<Input
						id="email"
						name="email"
						value={email}
						className="input-style"
						type="email"
            label="Email"
            size="large"
						placeholder="Email"
						onChange={this.handleChange}
						suffix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
					/>
					<Input.Password
						id="password"
						name="password"
						value={password}
						className="input-style"
						type="password"
            label="Password"
            size="large"
						placeholder="Password"
						autoComplete="true"
						onChange={this.handleChange}
					/>
					<Input.Password
						id="confirm-password"
						name="confirmPassword"
						value={confirmPassword}
						className="input-style"
						type="password"
            label="Password"
            size="large"
						placeholder="Confirm Password"
						autoComplete="true"
						onChange={this.handleChange}
					/>
					<Button className="button-size" type="primary" htmlType="submit" size="large">
						Sign Up
					</Button>
					<div className="signup-sub" onClick={this.props.showSignUp}>
						Back to Sign In
					</div>
				</Form>
			</div>
		);
	}
}

export default SignUp;
