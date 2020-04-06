import React from 'react';
import './header.scss';
import SideNav from '../side-nav/side-nav.cmp';
import { MdNotifications } from 'react-icons/md';
import SwitchCnnection from '../switch-connection/switch-connection.cmp';
import { Link } from 'react-router-dom';

const Header = () => (
	<div className="header">
    <SideNav />
    <div className="flex-c">
		<Link className="flex-c mr-10" to="/notifications">
			<MdNotifications style={{ fontSize: '1.15rem', color: 'white' }} />
		</Link>
    <SwitchCnnection />
    </div>
	</div>
);

export default Header;
