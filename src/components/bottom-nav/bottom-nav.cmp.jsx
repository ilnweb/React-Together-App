import React from 'react';
import './bottom-nav.scss';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MdPersonOutline, MdGroup, MdInsertInvitation } from "react-icons/md";
import { FaRegEdit} from "react-icons/fa";

class BottomNav extends React.Component {
	state = {
		current: '/'
	};

	componentDidMount() {
		const { pathname } = this.props.location;
		this.setState({
			current: pathname
		});
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
				selectedKeys={[ this.state.current ]}
				mode="horizontal"
			>
				<Menu.Item key="/">
					<MdPersonOutline className="icon-standart"/>
					<Link to="/" />
				</Menu.Item>
				<Menu.Item key="/connections">
					<MdGroup className="icon-standart"/>
					<Link to="/connections" />
				</Menu.Item>
				<Menu.Item key="/calendar">
					<MdInsertInvitation className="icon-standart"/>
					<Link to="/calendar" />
				</Menu.Item>
				<Menu.Item className="flex-c" key="/to-do">
        <FaRegEdit className="icon-standart"/>
					<Link to="/to-do" />
				</Menu.Item>
			</Menu>
		);
	}
}

export default BottomNav;
