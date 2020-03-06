import React from 'react';
import './side-nav.scss';
import { Drawer } from 'antd';
import { LogoutOutlined,UsergroupAddOutlined,UserOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
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
      <MenuUnfoldOutlined onClick={this.showDrawer} />

				<Drawer title="Togheder" placement="left" closable={false} onClose={this.onClose} visible={this.state.visible}>
					<h2 className="side-nav-greeting flex-c">Hi, {currentUser !== null ? currentUser.displayName !== null ? currentUser.displayName.split(' ').slice(0, 1):'' : ''}</h2>
					<div className="side-nav-content">
						<p>
            <UserOutlined /> Profile
						</p>
						<p><UsergroupAddOutlined /> Conections</p>
						<p>
              <LogoutOutlined /> <span onClick={() => authFB.signOut().then(() => this.onClose())}> Sign out</span>
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
