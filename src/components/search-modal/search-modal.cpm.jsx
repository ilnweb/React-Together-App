import React from 'react';
import './search-modal.scss';
import { firestore } from '../../firebase/firebase.config';
import { Modal, Button, Input } from 'antd';

class SearchModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			userSearch: '',
			userFound: null
		};
		this.handleSearch = this.handleSearch.bind(this);
	}

	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	setUser = (user) => {
		this.setState({
			userFound: user
		});
		console.log(this.state.userFound);
	};

	handleChange = (e) => {
		const { value } = e.target;
		this.setState({ userSearch: value });
	};

	handleSearch = () => {
		const users = [];
		firestore
			.collection('users')
			.where('displayName', '==', this.state.userSearch)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
          let item = {
            id: doc.id,
            ...doc.data()
          };
					users.push(item);
				});
			})
			.then(() => {
				this.setState({ usersFound: users });
			})
			.catch(function(error) {
				console.log('Error getting documents: ', error);
			});
	};

	render() {
		const { usersFound } = this.state;
		console.log(usersFound);
		return (
			<div>
				<Button className="mt-30" size="large" type="primary" onClick={this.showModal}>
					Add new connection
				</Button>
				<Modal
					className="search-modal"
					title="Find a friend"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={null}
				>
					<Input.Search
						placeholder="Search user by name"
						onSearch={this.handleSearch}
						onChange={this.handleChange}
						enterButton
					/>
					<div className="search-user-list">
						{usersFound ? usersFound.map((item) => <div key={item.id}>{item.displayName}</div>) : ''}
					</div>
				</Modal>
			</div>
		);
	}
}

export default SearchModal;
