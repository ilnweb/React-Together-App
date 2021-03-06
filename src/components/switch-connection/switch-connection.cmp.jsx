import React from 'react';
import './switch-connection.scss';
import { Menu, Dropdown } from 'antd';
import { MdGroup } from 'react-icons/md';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { pullConnection } from '../../firebase/firebase.config';
import { setConnection } from '../../redux/connection/connection.actions';
import { Empty } from 'antd';

const SwitchCnnection = ({ currentUser,setConnection }) => {

  const dispatchConnection = (item) => {
    pullConnection(item.connectionId,setConnection, currentUser.id)
  }
 
	const menu = (
		<Menu className="drop flex-c-c">
			<div className="switch-title">Switch Groups</div>
      {currentUser && currentUser.connections.length ?
        currentUser.connections.map((item) => (
          <Menu.Item key={item.connectionId}>
            <div className="switch-item flex-c p-10" onClick={() => dispatchConnection(item)}>
              <div className="switch-image" style={{ backgroundImage: `url(${item.connectionImg})` }} alt="conection" />
              <h2 className="black mb-5 ml-20"> {item.connectionName} </h2>
            </div>
          </Menu.Item>
        )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No Groupes</span>}/> }
		</Menu>
	);
	return (
    <Dropdown overlay={menu} placement="bottomRight">
      <MdGroup className="icon-standart ml-10" />
		</Dropdown>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setConnection: (connection) => dispatch(setConnection(connection))
});


const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps,mapDispatchToProps)(SwitchCnnection);
