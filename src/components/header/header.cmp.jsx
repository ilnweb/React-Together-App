import React from 'react';
import './header.scss';
import SideNav from '../side-nav/side-nav.cmp';
import { MdNotificationsNone,MdGroup } from "react-icons/md";
import { Link } from 'react-router-dom';

const Header = () => (
	<div className="header">
		<SideNav />
		<Link to="/notifications">
      <MdNotificationsNone className="icon-standart" style={{ color:"white"}}/>
      <MdGroup className="icon-standart ml-5" style={{ color:"white"}}/>
		</Link>
	</div>
);

export default Header;
