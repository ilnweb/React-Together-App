import React from 'react';
import './item-user.scss';
import { Button, Avatar } from 'antd';
import { letterName } from '../../functions/functions';

const ItemUser = ({ item, handleClick }) => {
	return (
		<div className="item-user flex-c">
      <div className="item-data flex-c">
        <Avatar className="avatar-small-no-picture" size="large" src={item.photoURL} >{letterName(item.displayName)}</Avatar>
				<div className="user-list-item">{item.displayName}</div>
			</div>
			<div className="flex-c">
				<Button type="primary" size="large" onClick={()=>handleClick(item)} >Invite</Button>
			</div>
		</div>
	);
};


export default ItemUser;