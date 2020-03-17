import React from 'react';
import './search-modal.scss';
import { firestore } from '../../firebase/firebase.config';
import ItemUser from '../item-user/item-user.cmp';
import { Modal, Button, Input, Avatar } from 'antd';
import UploadImage from '../upload-image/upload-image.cmp';
import { letterName } from '../../functions/functions';

class SearchModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			userSearch: '',
			userFound: '',
			invitedfriends: [],
			connectionName: '',
			connectionImg: ''
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

	handleClick = (item) => {
		this.setState((prevState) => ({
			invitedfriends: [ ...this.state.invitedfriends, item ]
		}));
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleImage = (imageUrl) => {
		this.setState({
			connectionImg: imageUrl
		});
	};

	render() {
		const { userFound, userSearch, invitedfriends } = this.state;

		return (
			<div>
				<Button className="mt-30" size="large" type="primary" onClick={this.showModal}>
					Add new connection
				</Button>
				<Modal
					className="search-modal"
					title="New connection"
					style={{ top: 20 }}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={null}
				>
					<div className="conection-details">
						<div className="search-user-list mb-20">
							Connection Name
							<Input
								id="name"
								name="connectionName"
								value={this.state.connectionName}
								className="input-style"
								type="text"
								label="name"
								size="large"
								placeholder="Your new connection name"
								autoComplete="true"
								onChange={this.handleChange}
							/>
						</div>
						<div className="search-user-list mb-20">
							<p>Connection Image</p>
							<UploadImage handleImage={this.handleImage} />
						</div>
						<div className="search-user-list mb-20">
							<p>Invited friends</p>
							<div className="invited-friends flex-c">
								{invitedfriends ? (
									invitedfriends.map((item) => (
										<Avatar className="avatar-no-picture" key={item.id} size="large" src={item.photoURL}>
											{letterName(item.displayName)}
										</Avatar>
									))
								) : (
									''
								)}
							</div>
						</div>
					</div>
					<hr />

					<div className="search-user-list mt-10">
						<p>Search friends</p>
						<Input.Search
							className="mb-20"
							name="userSearch"
							placeholder="Search user by name"
							onSearch={this.handleSearch}
							onChange={this.handleChange}
							value={userSearch}
							enterButton
						/>
						{userSearch &&
							userFound &&
							userFound.map(
								(item) =>
                item.displayName.toLowerCase().includes(userSearch.toLowerCase()) ? (
                  <ItemUser key={item.id} item={item} handleClick={this.handleClick} />
                ) : (
                  ''
                )
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