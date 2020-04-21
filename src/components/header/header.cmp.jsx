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

const Header = ({currentUser}) => (
	<div className="header">
		<SideNav />
		<div className="flex-c">
			<Link className="flex mr-10" to="/notifications">
			  {currentUser&&currentUser.notificationStatus&&<Badge count={'N'} dot={true} offset={[ 7, 7 ]} />}
				<MdNotifications onClick={()=>clearNotificationStatus(currentUser.id)} style={{ fontSize: '1.35rem', color: 'white' }} />
			</Link>
			<SwitchCnnection />
		</div>
	</div>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);
