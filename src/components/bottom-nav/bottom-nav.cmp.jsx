import React from 'react';
import './bottom-nav.scss';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, CalendarOutlined, FileDoneOutlined } from '@ant-design/icons';

class BottomNav extends React.Component {
	state = {
		current: 'home'
	};

	componentDidMount() {
		const { pathname } = this.props.location;
		this.setState({
			current: pathname
		});
	}

	handleClick = (e) => {
		console.log('click ', e);
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
					<HomeOutlined />
					<Link to="/" />
				</Menu.Item>
				<Menu.Item key="/connections">
					<UsergroupAddOutlined />
					<Link to="/connections" />
				</Menu.Item>
				<Menu.Item key="/calendar">
					<CalendarOutlined />
					<Link to="/calendar" />
				</Menu.Item>
				<Menu.Item key="/to-do">
        <FileDoneOutlined />
					<Link to="/to-do" />
				</Menu.Item>
			</Menu>
		);
	}
}

export default BottomNav;
