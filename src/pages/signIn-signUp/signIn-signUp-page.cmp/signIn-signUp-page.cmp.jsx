import React from 'react';
import './signIn-signUp-page.scss';
import SignIn from '../../../components/sign-in/sign-in.cmp';
import SignUP from '../../../components/sign-up/sign-up.cmp';

class SignInAndSignUpPage extends React.Component {
	state = { signin: true };

	showSignUp = () => {
		this.setState({ signin: !this.state.signin });
	};

	render() {
		return (
			<div className="sign-in-and-sign-up flex-c">
				<div className="logo-container flex-c-c">
					<h1 className="logo-2">TOGETHER</h1>
					<img
						src="https://res.cloudinary.com/ilnphotography/image/upload/v1582856305/HomePage/undraw_mobile_marketing_iqbr_bznozj.svg"
						alt=""
					/>
				</div>

				{this.state.signin ? <SignIn showSignUp={this.showSignUp} /> : <SignUP showSignUp={this.showSignUp} />}
			</div>
		);
	}
}

export default SignInAndSignUpPage;
