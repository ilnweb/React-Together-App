import React from 'react';
import './card-all-connections.scss';
import { Card } from 'antd';
import { MdOpenInNew, MdModeEdit, MdDelete } from "react-icons/md";
import Moment from 'react-moment';

const { Meta } = Card;

const CardAllConnections = ({item}) => (
  <Card
    bordered={false}
    className="mb-30"
		style={{ width: 300 }}
		cover={<div className="card-image" style={{ backgroundImage: `url(${item.connectionImg})` }} alt="conection" />}
		actions={[ <MdOpenInNew className="icon-standart" key="setting" />, <MdModeEdit className="icon-standart" key="edit" />, <MdDelete className="icon-standart" key="ellipsis" /> ]}
	>
		<Meta
			title={item.connectionName}
			description={<Moment fromNow date={item.createdAt.toDate()}></Moment>}
		/>
	</Card>
);
export default CardAllConnections;
