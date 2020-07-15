import React from 'react';
import './todo-list.scss';
import { Collapse, Empty, Button, Input, Popconfirm } from 'antd';
import ItemList from '../list-item/list-item.cmp';
import { firestore, addNotification } from '../../firebase/firebase.config';
import { MdAddCircle } from 'react-icons/md';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectConnectionData } from '../../redux/connection/connection.selectors';
import { createStructuredSelector } from 'reselect';

const { Panel } = Collapse;

class TodoList extends React.Component {
	state = {
		description: ''
	};

	dispatchItem = async () => {
		const { listID, list, connectionID,connection, currentUser } = this.props;
		const { description } = this.state;
    const collectionSet = firestore.doc(`connections/${connectionID}/userData/list`);
    if (!description) {
      return;
    }
		try {
			await collectionSet.update({
				[listID]: {
					name: list.name,
					date: list.date,
					items: [ ...list.items, description ]
				}
			});
		} catch (error) {
			alert('error sending list item', error.message);
		}
		this.setState({
			description: ''
		});
		addNotification(connection, currentUser, 'to-do', `added an item in ${list.name} list`);
	};

	removeItem = async (itemRemove) => {
		const { listID, list, connectionID } = this.props;
		const collectionSet = firestore.doc(`connections/${connectionID}/userData/list`);
		try {
			await collectionSet.update({
				[listID]: {
					name: list.name,
					date: list.date,
					items: list.items.filter((item) => item !== itemRemove)
				}
			});
		} catch (error) {
			alert('error sending list item', error.message);
		}
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { list, listID } = this.props;
		return (
			<div className="todo-list mt-30 mb-30">
				<Collapse defaultActiveKey={[ '1' ]} className="todo-list-items">
					<Panel header={<div className="todo-list-title">{list && list.name.toUpperCase()}</div>} key="1">
						<Input.Search
							size="large"
							className="p-15"
							name="description"
							placeholder="Add item to list"
							onChange={this.handleChange}
							value={this.state.description}
							enterButton={<MdAddCircle style={{ fontSize: '1.7rem' }} onClick={this.dispatchItem} />}
							onPressEnter={this.dispatchItem}
						/>
						{list.items.length ? (
							list.items
								.slice(0)
								.reverse()
								.map((item, index) => <ItemList key={index} item={item} removeItem={this.removeItem} />)
						) : (
							<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
						)}
					</Panel>
				</Collapse>
				<Popconfirm
					title="Are you sure delete this List?"
					onConfirm={() => this.props.deleteItem(listID)}
					okText="Yes"
					cancelText="No"
				>
					<Button className="button-size list-button" size="large" type="primary">
						Delete List
					</Button>
				</Popconfirm>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	connection: selectConnectionData
});

export default connect(mapStateToProps)(TodoList);
