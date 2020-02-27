import React from 'react';
import './header.scss';
import SideNav from '../side-nav/side-nav.cmp';
import { Icon } from 'antd';

const Header = () => (
	<div className="header">
		<SideNav />
		<div>
			<Icon type="bell" />
			<Icon type="more" />
		</div>
	</div>
);

export default Header;
