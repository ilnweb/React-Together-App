import React from 'react';
import './sign-in.scss';
import { authFB, signInWithGoogle, signInWithFacebook } from '../../firebase/firebase.config';
import { Button, Input, Form } from 'antd';
import { MdMailOutline } from "react-icons/md";
import { FaGoogle, FaFacebook } from "react-icons/fa";


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
          <label for="email1">Email</label>
					<Input
						id="email1"
						name="email"
						value={this.state.email}
						className="input-style input-signin"
						type="email"
						label="Email"
						size="large"
						placeholder="Email"
						suffix={<MdMailOutline style={{ color: 'rgba(0,0,0,.25)' }} />}
						autoComplete="true"
						onChange={this.handleChange}
          />
          <label for="password1">Password</label>
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
					<Button className="button-size"  size="large" type="primary" onClick={this.handleSubmit}>
						Sign In
					</Button>
					<div className="flex-c input-style">
						<Button
              className="flex-c g-signin mr-5"
              aria-label="Google log-in"
							size="large"
              icon={<FaGoogle/>}
							onClick={signInWithGoogle}
						/>
						<Button
              className="flex-c f-signin ml-5"
              aria-label="Facebook log-in"
							size="large"
              icon={<FaFacebook/>}
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
