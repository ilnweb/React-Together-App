import React from 'react';
import './item-user.scss';
import { Button,Avatar  } from 'antd';

const ItemUser = ({ item }) => {
	return (
		<div className="item-user flex-c">
      <div className="item-data flex-c">
        <Avatar size="large" src={item.photoURL} />
				<div className="user-name">{item.displayName.toUpperCase()}</div>
			</div>
			<div className="flex-c">
				<Button type="primary" size="large">Invite</Button>
			</div>
		</div>
	);
};


export default ItemUser;