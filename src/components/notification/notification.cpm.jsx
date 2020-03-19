import React from 'react';
import './notification.scss';
import { Button } from 'antd';

const Notification = ({ item, handleClick }) => {
	return (
    <div className="notification flex-c">
    <div className="notification-image" style={{backgroundImage: `url(${item.connectionImg})`}} alt="conection"/>
      <div className="notification-data flex p-20">
       
				<div className="notification-list-item">{item.displayName} invited you to {item.connectionName}</div>
			</div>
			<div className="flex-c">
				<Button type="primary" size="large" onClick={()=>handleClick(item)} >Invite</Button>
			</div>
		</div>
	);
};


export default Notification;