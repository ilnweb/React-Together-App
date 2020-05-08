import React from 'react';
import './notification.scss';
import { Button, Avatar } from 'antd';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const Notification = ({ item, handleAccept, handleDecline, handleDelete,handlePullconnection }) => {
	return (
		<div className="notification">
			<Link to={'/'+ item.type}>
				<div className="notification-data flex-c p-10" onClick={() => handlePullconnection(item)}>
					<div>
						<Avatar size={59} src={item.type ? item.userImg : item.connectionImg} />
					</div>
					<div className="flex-c-c ml-10">
						<div className="notification-list-item ml-10 flex-c-c">
							<div className="notification-date">
								<strong>{item.displayName}</strong> {item.type ? (
									item.notificationBody
								) : (
									'invited you to connection'
								)}{' '}
								<strong>{item.connectionName}</strong>
							</div>
							<Moment className="date-color" fromNow date={item.createdAt && item.createdAt.toDate()} />
						</div>
						{!item.type && (
							<div className="notification-buttons flex">
								<Button className="m-10 mb-0" type="danger" size="small" onClick={() => handleDecline(item)}>
									Decline
								</Button>
								<Link to="/all-connections">
									<Button className="m-10 mb-0" type="primary" size="small" onClick={() => handleAccept(item)}>
										Accept
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</Link>
			<div className="mr-10">
				<MdDelete style={{ fontSize: '1.5rem' }} onClick={() => handleDelete(item)} />
			</div>
		</div>
	);
};

export default Notification;
