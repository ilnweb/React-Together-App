import React from 'react';
import './notification.scss';
import { Button } from 'antd';
import Moment from 'react-moment';

const Notification = ({ item, handleAccept }) => {
	return (
		<div className="notification">
			<div className="notification-data flex p-10">
				<div className="notification-image" style={{ backgroundImage: `url(${item.connectionImg})` }} alt="conection" />
        <div className="notification-list-item ml-10 flex-c-c">
        <div className="notification-date">
          <strong>{item.displayName}</strong> invited you to connection <strong>{item.connectionName}</strong> 
          </div>
					<Moment fromNow date={item.createdAt.toDate()} />
				
				</div>
				
			</div>

			<div className="flex-c">
				<Button type="danger" size="large" onClick={() => handleAccept(item)} block>
					Decline
				</Button>
				<Button type="primary" size="large" onClick={() => handleAccept(item)} block>
					Accept
				</Button>
			</div>
		</div>
	);
};

export default Notification;
