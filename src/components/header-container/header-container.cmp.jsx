import React from 'react';
import './header-container.scss';

const HeaderContainer = ({children}) => (
	<div className="header-container">
	  {children}
	</div>
);

export default HeaderContainer;