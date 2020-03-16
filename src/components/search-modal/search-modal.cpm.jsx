import React from 'react';
import './search-modal.scss';
import { firestore } from '../../firebase/firebase.config';
import ItemUser from '../item-user/item-user.cmp';
import { Modal, Button, Input } from 'antd';

class SearchModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			userSearch: '',
			userFound: ''
		};
  }
  
  componentDidMount() { 
    const usersArray = firestore.doc(`searchusers/F6HYw5Nwerc3tnwSf3aI`);
    usersArray.get()
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

	handleSearch = () => {
    
	};

	render() {
		const { userFound } = this.state;
		const { userSearch } = this.state;
		console.log(this.state);
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
						<div className="search-user-list">
							<p>Connected with</p>
						</div>
						<div className="search-user-list">
							<p>Connection Name</p>
						</div>
						<div className="search-user-list">
							<p>Connection Image</p>
						</div>
          </div>
          <hr />
          <Input.Search
						placeholder="Search user by name"
						onSearch={this.handleSearch}
						onChange={this.handleChange}
						enterButton
					/>
          <div className="search-user-list">
						{userSearch ? userFound.map((item) => item.displayName.toLowerCase().includes(userSearch.toLowerCase()) ? <ItemUser key={item.id} item={item} />:'') : '' }
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
