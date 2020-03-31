import React from 'react';
import './sign-up.scss';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import { authFB, createUserProfileDocument } from '../../firebase/firebase.config';

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
			const { user } = await authFB.createUserWithEmailAndPassword(email, password);
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
				<Form className="sign-in-up flex-c">
					<Input
						id="name"
						name="displayName"
						value={displayName}
						className="input-style input-signin"
						type="text"
            label="Name"
            size="large"
						placeholder="Name"
						onChange={this.handleChange}
						suffix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
					/>
					<Input
						id="email"
						name="email"
						value={email}
						className="input-style input-signin"
						type="email"
            label="Email"
            size="large"
						placeholder="Email"
						onChange={this.handleChange}
						suffix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
					/>
					<Input.Password
						id="password"
						name="password"
						value={password}
						className="input-style input-signin"
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
						className="input-style input-signin"
						type="password"
            label="Password"
            size="large"
						placeholder="Confirm Password"
						autoComplete="true"
						onChange={this.handleChange}
					/>
					<Button className="button-size input-style" type="primary" size="large" onClick={this.handleSubmit}>
						Sign Up
					</Button>
					<div className="signup-sub input-style" onClick={this.props.showSignUp}>
						Back to Sign In
					</div>
				</Form>
			</div>
		);
	}
}

export default SignUp;
