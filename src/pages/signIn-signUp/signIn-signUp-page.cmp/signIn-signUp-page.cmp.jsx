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
				<div className="logo mb-20 flex-c">TG</div>

				{this.state.signin ? <SignIn showSignUp={this.showSignUp} /> : <SignUP showSignUp={this.showSignUp} />}
			</div>
		);
	}
}

export default SignInAndSignUpPage;
