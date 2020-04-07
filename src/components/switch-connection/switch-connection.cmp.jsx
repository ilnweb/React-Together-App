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
    pullConnection(item.connectionId,setConnection)
  }
 
	const menu = (
		<Menu className="drop flex-c-c">
			<div className="switch-title">Switch Groupes</div>
      {currentUser && currentUser.connections.length ?
        currentUser.connections.map((item) => (
          <Menu.Item key={item.connectionId}>
            <div className="flex-c p-10" onClick={() => dispatchConnection(item)}>
              <div className="switch-image" style={{ backgroundImage: `url(${item.connectionImg})` }} alt="conection" />
              <h2 className="black mb-5 ml-20"> {item.connectionName} </h2>
            </div>
          </Menu.Item>
        )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No Groupes</span>}/> }
		</Menu>
	);
	return (
    <Dropdown  overlay={menu}>
      <MdGroup className="icon-standart" />
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
