import React from 'react';
import './search-modal.scss';
import { firestore, createNewConnection } from '../../firebase/firebase.config';
import ItemUser from '../item-user/item-user.cmp';
import { Modal, Button, Input, Avatar } from 'antd';
import UploadImage from '../upload-image/upload-image.cmp';
import { letterName } from '../../functions/functions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

class SearchModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			userSearch: '',
			userList: '',
			invitedfriends: '',
			connectionName: '',
			connectionImg: ''
		};
	}

	componentDidMount() {
		const users = firestore.doc(`searchusers/F6HYw5Nwerc3tnwSf3aI`);
		users
			.get()
			.then((doc) => {
				const userArr = [];
				const users = doc.data();
				Object.keys(users).map((key) =>
					userArr.push({
						id: key,
						displayName: users[key].displayName,
						photoURL: users[key].photoURL
					})
				);
				this.setState({
					userList: userArr
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
			userList: '',
			invitedfriends: '',
			connectionName: ''
		});
	};

	handleClick = (item) => {
		if (!this.state.invitedfriends.includes(item)) {
			this.setState((prevState) => ({
				invitedfriends: [ ...this.state.invitedfriends, item ],
				userSearch: ''
			}));
		}
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

	handleCreate = () => {
		const { invitedfriends, connectionName, connectionImg } = this.state;
		const { currentUser } = this.props;
		const currentUserData = {
			displayName: currentUser.displayName,
			id: currentUser.id,
			photoURL: currentUser.photoURL
		};
		invitedfriends.push(currentUserData);
		createNewConnection(connectionName, connectionImg, invitedfriends, currentUser);
		this.handleCancel();
	};

	render() {
		const { userList, userSearch, invitedfriends } = this.state;
		console.log(this.state.userList);
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
										<Avatar className="avatar-small-no-picture m-5" key={item.id} size="large" src={item.photoURL}>
											{letterName(item.displayName)}
										</Avatar>
									))
								) : (
									<div>"No friends Invited" </div>
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
							userList &&
							userList.map(
								(item) =>
									item.displayName.toLowerCase().includes(userSearch.toLowerCase()) && (
										<ItemUser key={item.id} item={item} handleClick={this.handleClick} />
									)
							)}
					</div>
					<Button className="mt-30" size="large" type="primary" onClick={this.handleCreate}>
						Create
					</Button>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(SearchModal);