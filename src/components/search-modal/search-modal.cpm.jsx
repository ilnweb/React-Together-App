import React from 'react';
import './search-modal.scss';
import { Modal, Button, Input } from 'antd';

class SearchModal extends React.Component {
	state = {
		visible: false,
		userSearch: ''
	};

	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleCancel = (e) => {
		this.setState({
			visible: false
		});
	};

	handleChange = (e) => {
		const { value } = e.target;
		this.setState({ userSearch: value });
	};

	render() {
		console.log(this.state.userSearch);
		return (
			<div>
				<Button className="mt-30" size="large" type="primary" onClick={this.showModal}>
					Add new connection
				</Button>
				<Modal
					title="Find a friend"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={null}
				>
					<Input.Search
						placeholder="Search user by name"
						onSearch={(value) => console.log(value)}
						onChange={this.handleChange}
						enterButton
					/>
					<div className="search-user-list">user1</div>
				</Modal>
			</div>
		);
	}
}

export default SearchModal;
