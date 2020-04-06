import React from 'react';
import './notification.scss';
import { Button } from 'antd';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Notification = ({ item, handleAccept }) => {
	return (
		<div className="notification">
			<div className="notification-data flex-c p-10">
				<div className="notification-image" style={{ backgroundImage: `url(${item.connectionImg})` }} alt="conection" />
				<div className="flex-c-c ml-10">
					<div className="notification-list-item ml-10 mt-10 flex-c-c" >
						<div className="notification-date">
							<strong>{item.displayName}</strong> invited you to connection <strong>{item.connectionName}</strong>
						</div>
						<Moment className="date-color" fromNow date={item.createdAt.toDate()} />
					</div>
					<div className="notification-buttons flex">
						<Button className="m-10" type="danger" size="large">
              Decline
            </Button>
            <Link to="/all-connections">
						<Button className="m-10" type="primary" size="large" onClick={() => handleAccept(item)}>
							Accept
            </Button>
            </Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notification;
