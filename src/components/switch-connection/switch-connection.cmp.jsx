import React from 'react';
import './switch-connection.scss';
import { Menu, Dropdown } from 'antd';
import { MdGroup } from 'react-icons/md';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const SwitchCnnection = ({ currentUser }) => {
	const menu = (
		<Menu className="drop flex-c-c">
			<div className="switch-title">Switch Groupes</div>
			{currentUser &&
				currentUser.connections.map((item) => (
					<Menu.Item key={item.connectionId}>
            <div className="flex-c p-10">
              <div className="switch-image" style={{ backgroundImage: `url(${item.connectionImg})` }} alt="conection" />
              <h2 className="black mb-5 ml-20"> {item.connectionName} </h2></div>
					</Menu.Item>
				))}
		</Menu>
	);
	return (
		<Dropdown overlay={menu}>
			<MdGroup className="icon-standart" />
		</Dropdown>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(SwitchCnnection);
