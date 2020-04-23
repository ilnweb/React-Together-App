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
				<div className="logo-letter mb-20 flex-c"> <img src="https://res.cloudinary.com/ilnphotography/image/upload/c_scale,q_auto,w_191/v1584531306/HomePage/logoTT_weox84.png" alt="logo"/></div>

				{this.state.signin ? <SignIn showSignUp={this.showSignUp} /> : <SignUP showSignUp={this.showSignUp} />}
			</div>
		);
	}
}

export default SignInAndSignUpPage;
