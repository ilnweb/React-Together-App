import React from 'react';
import './header.scss';
import SideNav from '../side-nav/side-nav.cmp';
import { BellOutlined } from '@ant-design/icons';

const Header = () => (
	<div className="header">
		<SideNav />
		<div>
      <BellOutlined />
		</div>
	</div>
);

export default Header;
