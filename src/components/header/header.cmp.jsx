import React from 'react';
import './header.scss';
import SideNav from '../side-nav/side-nav.cmp';
import { MdNotifications } from 'react-icons/md';
import SwitchCnnection from '../switch-connection/switch-connection.cmp';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { clearNotificationStatus } from '../../firebase/firebase.config';
import { withRouter } from "react-router";

const Header = ({ currentUser, location }) => {
  console.log(location.pathname);
	return (
		<div className="header">
			<SideNav />
			<div className="flex-c">
				<Link className="flex" to="/notifications">
					{currentUser && currentUser.notificationStatus && <Badge count={'N'} dot={true} offset={[ 7, 7 ]} />}
					<MdNotifications
						onClick={() => clearNotificationStatus(currentUser.id)}
						style={{ fontSize: '1.35rem', color: 'white' }}
					/>
				</Link>
				{location.pathname!=='/' ? <SwitchCnnection className="flex ml-10"/> :''}
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default  withRouter(connect(mapStateToProps)(Header));
