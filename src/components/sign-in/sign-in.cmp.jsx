import React from 'react';
import './sign-in.scss';
import { authFB, signInWithGoogle, signInWithFacebook } from '../../firebase/firebase.config';
import { Button, Input, Form } from 'antd';
import { MailOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';


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
			await authFB.signInWithEmailAndPassword(email, password);
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
				<Form className="sign-in-up flex-c">
					<Input
						id="email1"
						name="email"
						value={this.state.email}
						className="input-style input-signin"
						type="email"
						label="Email"
						size="large"
						placeholder="Email"
						suffix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
						autoComplete="true"
						onChange={this.handleChange}
					/>
					<Input.Password
						id="password1"
						name="password"
						value={this.state.password}
						className="input-style input-signin"
						type="password"
						label="Password"
						size="large"
						placeholder="Password"
						autoComplete="true"
						onChange={this.handleChange}
					/>

					<Button className="button-size button-color" size="large" type="primary" onClick={this.handleSubmit}>
						Sign In
					</Button>
					<div className="flex-c input-style">
						<Button
							className="flex-c g-signin mr-5"
							size="large"
              icon={<GoogleOutlined/>}
							onClick={signInWithGoogle}
						/>
						<Button
							className="flex-c f-signin ml-5"
							size="large"
              icon={<FacebookOutlined/>}
							onClick={signInWithFacebook}
						/>
					</div>
					<div className="signup-sub input-style" onClick={this.props.showSignUp}>
						New here? Sign Up
					</div>
				</Form>
			</div>
		);
	}
}

export default SignIn;
