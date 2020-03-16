import React from 'react';
import './search-modal.scss';
import { firestore } from '../../firebase/firebase.config';
import ItemUser from '../item-user/item-user.cmp';
import { Modal, Button, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

class SearchModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			userSearch: '',
      userFound: '',
      newConnection: {
        name: '',
        image: '',
        invitedfriends:[]
      }
		};
	}

	componentDidMount() {
		const usersArray = firestore.doc(`searchusers/F6HYw5Nwerc3tnwSf3aI`);
		usersArray
			.get()
			.then((doc) => {
				this.setState({
					userFound: doc.data().users
				});
			})
			.catch(function(error) {
				console.log('Error getting documents: ', error);
			});
	}

	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false,
			userSearch: '',
			userFound: ''
		});
	};

	handleChange = (e) => {
		const { value } = e.target;
		this.setState({ userSearch: value });
	};

	handleSearch = () => {};

	render() {
		const { userFound } = this.state;
		const { userSearch } = this.state;

		return (
			<div>
				<Button className="mt-30" size="large" type="primary" onClick={this.showModal}>
					Add new connection
				</Button>
				<Modal
					className="search-modal"
					title="New connection"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={null}
				>
					<div className="conection-details">
						<div className="search-user-list mb-30">
							Connection Name
							<Input
								id="email1"
								name="email"
								value={this.state.newConnection.name}
								className="input-style"
								type="email"
								label="Email"
								size="large"
								placeholder="Email"
								autoComplete="true"
								onChange={this.handleChange}
							/>
						</div>
						<div className="search-user-list mb-30">
							Connection Image
							<Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
								<Button>
									<UploadOutlined /> Upload Directory
								</Button>
							</Upload>
						</div>
						<div className="search-user-list mb-30">
							Invited friends
						</div>
					</div>
					<hr />

					<div className="search-user-list mt-10">
						<p>Search friends</p>
						<Input.Search
							placeholder="Search user by name"
							onSearch={this.handleSearch}
							onChange={this.handleChange}
							enterButton
						/>
						{userSearch ? (
							userFound.map(
								(item) =>
									item.displayName.toLowerCase().includes(userSearch.toLowerCase()) ? (
										<ItemUser key={item.id} item={item} />
									) : (
										''
									)
							)
						) : (
							''
						)}
					</div>

					<Button className="mt-30" size="large" type="primary">
						Create
					</Button>
				</Modal>
			</div>
		);
	}
}

export default SearchModal;
