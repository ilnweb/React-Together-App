import React from 'react';
import './bottom-nav.scss';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MdPersonOutline, MdInsertInvitation } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDotChart } from 'react-icons/ai';
import { withRouter } from "react-router";

class BottomNav extends React.Component {
  state = {
    current: this.props.location.pathname
  }
  
  currentTab = (location) => {
    this.setState({
			current: location
		});
  }

  static getDerivedStateFromProps(props, state) {
    if (props.location.pathname !== state.current) {
      return {
        current: props.location.pathname
      };
    }
    return null;
  }

	handleClick = (e) => {
		this.setState({
			current: e.key
		});
	};

  render() {
		return (
			<Menu
				className="bottom-nav flex-c"
        onClick={this.handleClick}
        onChange={this.handleClick}
				selectedKeys={ [this.state.current] }
				mode="horizontal"
			>
				<Menu.Item key="/">
					<MdPersonOutline className="icon-standart" />
					<Link to="/" />
				</Menu.Item>
				<Menu.Item key="/connections">
					<AiOutlineDotChart className="icon-standart" />
					<Link to="/connections" />
        </Menu.Item>
        <Menu.Item className="flex-c" key="/to-do">
					<FaRegEdit style={{fontSize:'1.4rem'}} className="icon-standart" />
					<Link to="/to-do" />
				</Menu.Item>
				<Menu.Item key="/calendar">
					<MdInsertInvitation style={{fontSize:'1.4rem'}} className="icon-standart" />
					<Link to="/calendar" />
				</Menu.Item>
			</Menu>
		);
	}
}

export default withRouter(BottomNav);
