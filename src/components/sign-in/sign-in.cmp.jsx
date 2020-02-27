import React from 'react';
import './sign-in.scss';
import { auth, signInWithGoogle, signInWithFacebook } from '../../firebase/firebase.config';
import { Button, Input, Form, Icon } from 'antd';

class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			// this.setState({ email: '', password: '' });
		} catch (error) {
			console.error(`wtf ${error}`);
		}
	};

	handleChange = (e) => {
		const { value, name } = e.target;

		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="sign-in-up flex-c-c">
				<h1>Sign In</h1>
				<Form className="sign-in-up flex-c" onSubmit={this.handleSubmit}>
					<Input
						id="email1"
						name="email"
						value={this.state.email}
						className="input-style"
						type="email"
						label="Email"
						placeholder="Email"
						suffix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
						autoComplete="true"
						onChange={this.handleChange}
					/>
					<Input.Password
						id="password1"
						name="password"
						value={this.state.password}
						className="input-style"
						type="password"
						label="Password"
						placeholder="Password"
						autoComplete="true"
						onChange={this.handleChange}
					/>

					<Button className="button-size" type="primary" htmlType="submit" shape="round">
						Sign In
					</Button>

					<Button className="button-size g-signin" type="danger" icon="google" onClick={signInWithGoogle}>
						Sign In
					</Button>

					<Button className="button-size f-signin" type="primary" icon="facebook" onClick={signInWithFacebook}>
						Sign In
					</Button>

					<div className="signup-sub" onClick={this.props.showSignUp}>
						New here? Sign Up
					</div>
				</Form>
			</div>
		);
	}
}

export default SignIn;
