import React from 'react';
import './header.scss';
import SideNav from '../side-nav/side-nav.cmp';
import { MdNotifications,MdGroup } from "react-icons/md";
import { Link } from 'react-router-dom';

const Header = () => (
	<div className="header">
		<SideNav />
		<Link className="flex-c" to="/notifications">
      <MdNotifications  style={{fontSize:"1.15rem", color:"white"}}/>
      <MdGroup className="icon-standart ml-10" style={{ color:"white"}}/>
		</Link>
	</div>
);

export default Header;
