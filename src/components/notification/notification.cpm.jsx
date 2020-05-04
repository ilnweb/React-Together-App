import React from 'react';
import './notification.scss';
import { Button, Avatar } from 'antd';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Notification = ({ item, handleAccept }) => {
	return (
		<div className="notification">
      <div className="notification-data flex-c p-10">
        <Avatar shape={item.type ? '' : 'square'} size={64} src={item.type ? item.userImg : item.connectionImg}/>
				<div className="flex-c-c ml-10">
					<div className="notification-list-item ml-10 mt-10 flex-c-c" >
						<div className="notification-date">
							<strong>{item.displayName}</strong>&nbsp; {item.type ? item.notificationBody : 'invited you to connection' }&nbsp; <strong>{item.connectionName}</strong>
						</div>
						<Moment className="date-color" fromNow date={item.createdAt&&item.createdAt.toDate()} />
					</div>
					{!item.type && <div className="notification-buttons flex">
						<Button className="m-10" type="danger" size="large">
              Decline
            </Button>
            <Link to="/all-connections">
						<Button className="m-10" type="primary" size="large" onClick={() => handleAccept(item)}>
							Accept
            </Button>
            </Link>
					</div>}
				</div>
			</div>
		</div>
	);
};

export default Notification;
