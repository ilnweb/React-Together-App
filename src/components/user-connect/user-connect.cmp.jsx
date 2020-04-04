import React from 'react';
import './user-connect.scss';
import { Avatar } from 'antd';
import { letterName } from '../../functions/functions';

const UserConnect = ({ item, handleClick }) => {
	return (
		<div className="user-connect flex-c">
      <div className="user-connect-data flex-c">
        <Avatar className="avatar-small-no-picture" size="large" src={item.photoURL} >{letterName(item.displayName)}</Avatar>
				<div className="user-list-item">{item.displayName}</div>
			</div>
			<div className="flex-c">
				<div className="item-red">- 370$</div>
			</div>
		</div>
	);
};


export default UserConnect;