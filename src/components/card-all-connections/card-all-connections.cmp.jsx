import React from "react";
import "./card-all-connections.scss";
import { Card } from "antd";
import { MdOpenInNew, MdModeEdit, MdDelete } from "react-icons/md";
import Moment from "react-moment";

const { Meta } = Card;

const CardAllConnections = ({ item, dispatchConnection, deleteConnection }) => (
  <Card
    bordered={false}
    className="mb-30"
    cover={
        <div
          onClick={() => dispatchConnection(item)}
          className="card-image"
          style={{ backgroundImage: `url(${item.connectionImg})` }}
          alt="conection"
        />
    }
    actions={[
        <MdOpenInNew
          onClick={() => dispatchConnection(item)}
          className="icon-standart"
          key="setting"
        />,
      <MdModeEdit className="icon-standart" key="edit" />,
      <MdDelete
        onClick={() => deleteConnection(item)}
        className="icon-standart"
        key="ellipsis"
      />,
    ]}
  >
    <Meta
      title={item.connectionName}
      description={<Moment fromNow date={item.createdAt.toDate()}></Moment>}
    />
  </Card>
);
export default CardAllConnections;
