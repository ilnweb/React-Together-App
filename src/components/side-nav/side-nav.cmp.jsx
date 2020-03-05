import React from 'react';
import './side-nav.scss';
import { Drawer, Icon } from 'antd';
import { authFB } from '../../firebase/firebase.config';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

class SideNav extends React.Component {
	state = { visible: false };

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const { currentUser } = this.props;

		return (
			<div className="side-nav">
				<Icon type="menu-unfold" onClick={this.showDrawer} />

				<Drawer title="Togheder" placement="left" closable={false} onClose={this.onClose} visible={this.state.visible}>
					<h2 className="side-nav-greeting flex-c">Hi, {currentUser !== null ? currentUser.displayName !== null ? currentUser.displayName.split(' ').slice(0, 1):'' : ''}</h2>
					<div className="side-nav-content">
						<p>
							<Icon type="user" /> Profile
						</p>
						<p><Icon type="usergroup-add" /> Conections</p>
						<p>
							<Icon type="logout" /> <span onClick={() => authFB.signOut().then(() => this.onClose())}> Sign out</span>
						</p>
					</div>
				</Drawer>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(SideNav);
