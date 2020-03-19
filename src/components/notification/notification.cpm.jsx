import React from 'react';
import './notification.scss';
import { Button } from 'antd';

const Notification = ({ item, handleClick }) => {
	return (
		<div className="notification">
			<div className="notification-data flex p-10">
				<div className="notification-image" style={{ backgroundImage: `url(${item.connectionImg})` }} alt="conection" />
				<div className="notification-list-item ml-10 flex-c">
					{item.displayName} invited you to  {item.connectionName}
				</div>
			</div>

			<div className="flex-c">
				<Button type="danger" size="large" onClick={() => handleClick(item)} block>
					Decline
				</Button>
				<Button type="primary" size="large" onClick={() => handleClick(item)} block>
					Accept
				</Button>
			</div>
		</div>
	);
};

export default Notification;
