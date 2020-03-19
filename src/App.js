import React from 'react';
import 'antd/dist/antd.css';
import './style/css-util.css';
import './style/sass-variable.scss';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignInAndSignUpPage from './pages/signIn-signUp/signIn-signUp-page.cmp/signIn-signUp-page.cmp';
import Header from './components/header/header.cmp';
import SpendingPage from './pages/Spendings/spendings-page.cmp';
import ConnectionsPage from './pages/conections/connections-page.cmp';
import CalendarPage from './pages/calendar/calendar-page.cmp';
import ToDoPage from './pages/todo/todo-page.com';
import NotificationsPage from './pages/notifications/notifications-page.cmp';
import AllConectionsPage from './pages/all-conections/all-connections-page.cmp';
import BottomNav from './components/bottom-nav/bottom-nav.cmp';
import { authFB, createUserProfileDocument } from './firebase/firebase.config';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import WithSpinner from './components/with-spinner/with-spinner.cmp';

const SpendingPageWithSpinner = WithSpinner(SpendingPage);
const ConnectionsPageWithSpinner = WithSpinner(ConnectionsPage);

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
					this.setState({ isLoading: false });
				});
			} else {
				this.setState({ currentUser: userAuth });
				this.setState({ isLoading: false });
			}
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
						render={() =>
							authFB.currentUser === null ? (
								<Redirect to="/signin" />
							) : (
								<SpendingPageWithSpinner isLoading={this.state.isLoading} />
							)}
					/>
					<Route
						exact
						path="/signin"
						render={() => (authFB.currentUser !== null ? <Redirect to="/" /> : <SignInAndSignUpPage />)}
					/>
					<Route path="/connections" render={() => <ConnectionsPageWithSpinner isLoading={this.state.isLoading} />} />
					<Route path="/calendar" component={CalendarPage} />
					<Route path="/to-do" component={ToDoPage} />
					<Route path="/all-connections" component={AllConectionsPage} />
					<Route path="/notifications" component={NotificationsPage} />
				</Switch>
				<Route component={BottomNav} />
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
