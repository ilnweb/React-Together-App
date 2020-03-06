import React from 'react';
import 'antd/dist/antd.css';
import './style/css-util.css';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignInAndSignUpPage from './pages/signIn-signUp/signIn-signUp-page.cmp/signIn-signUp-page.cmp';
import Header from './components/header/header.cmp';
import SpendingPage from './pages/Spendings/spendings-page.cmp';
import BottomNav from './components/bottom-nav/bottom-nav.cmp';
import { authFB, createUserProfileDocument } from './firebase/firebase.config';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			signin: true
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = authFB.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						photoURL: userAuth.photoURL,
						...snapShot.data()
					});
				});
			} else {
				this.setState({ currentUser: userAuth });
			}

			setTimeout(
				function() {
					this.setState({ isLoading: false });
				}.bind(this),
				2000
			);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div className="App">
				<div className={`flex-c-c ${this.state.isLoading ? 'isLoading' : 'hide'}`}>
					<div className="logo-container flex-c-c">
						<h1 className="logo-2">Together</h1>
						<p>Lets do it better!</p>
						<img
							src="https://res.cloudinary.com/ilnphotography/image/upload/v1582856305/HomePage/undraw_mobile_marketing_iqbr_bznozj.svg"
							alt=""
						/>
					</div>
				</div>
				<Header />
				<Switch>
					<Route
						exact
						path="/"
						render={() => (authFB.currentUser === null ? <Redirect to="/signin" /> : <SpendingPage />)}
					/>
					<Route
						exact
						path="/signin"
						render={() => (authFB.currentUser !== null ? <Redirect to="/" /> : <SignInAndSignUpPage />)}
					/>
				</Switch>
				<BottomNav className="App-footer" />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
