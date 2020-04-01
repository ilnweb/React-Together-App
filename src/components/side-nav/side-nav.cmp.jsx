import React from 'react';
import './side-nav.scss';
import { Drawer } from 'antd';
import { MdExitToApp, MdGroup, MdPerson } from 'react-icons/md';
import { FaBars} from 'react-icons/fa';
import { authFB } from '../../firebase/firebase.config';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Link } from 'react-router-dom';

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
				<FaBars style={{fontSize:"1.2rem"}} onClick={this.showDrawer} />

				<Drawer title="Together" placement="left" closable={false} onClose={this.onClose} visible={this.state.visible}>
					<h2 className="side-nav-greeting flex-c">
						Hi, {currentUser && currentUser.displayName.split(' ').slice(0, 1)}
					</h2>
					<div className="side-nav-content flex-c-c">
						<Link className="flex-c" to="/profile">
              <MdPerson className="icon-standart m-15 ml-0 mb-10" />
              <span onClick={this.onClose}> Profile</span>
						</Link>
						<Link className="flex-c" to="/all-connections">
              <MdGroup className="icon-standart m-15 ml-0 mb-10" />
              <span onClick={this.onClose}> All Conections</span>
						</Link>
						<Link className="flex-c" to="/signin">
							<MdExitToApp className="icon-standart m-15 ml-0 mb-10" />{' '}
							<span onClick={() => authFB.signOut().then(() => this.onClose())}> Sign out</span>
						</Link>
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
