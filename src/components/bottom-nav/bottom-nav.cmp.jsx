import React from 'react';
import './bottom-nav.scss';
import { Menu } from 'antd';
import {
  HomeOutlined ,
  UsergroupAddOutlined ,
  CalendarOutlined,
  FormOutlined 
} from '@ant-design/icons';

const { SubMenu } = Menu;

class BottomNav extends React.Component {
  state = {
    current: 'home',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
     
      <Menu className="bottom-nav flex-c" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="home">
          <HomeOutlined  />
        
        </Menu.Item>
        <Menu.Item key="connections">
          <UsergroupAddOutlined  />
         
        </Menu.Item>
        <Menu.Item key="calendar">
          <CalendarOutlined/>
        
        </Menu.Item>
        <Menu.Item key="todo">
          <FormOutlined  />
          
        </Menu.Item>
        </Menu>
    
    );
  }
}

export default BottomNav;