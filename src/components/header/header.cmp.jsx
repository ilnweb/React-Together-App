import React from 'react';
import './header.scss';
import SideNav from '../side-nav/side-nav.cmp';
import { BellOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Header = () => (
	<div className="header">
		<SideNav />
		<Link to="/notifications">
      <BellOutlined style={{ color:"white"}}/>
		</Link>
	</div>
);

export default Header;
