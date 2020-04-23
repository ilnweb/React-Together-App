import React from 'react';
import './todo-list.scss';
import { Collapse, Empty, Button, Input } from 'antd';
import ItemList from '../list-item/list-item.cmp';
import { firestore } from '../../firebase/firebase.config';
import firebase from 'firebase/app';
import { MdAddCircle } from 'react-icons/md';

const { Panel } = Collapse;

class TodoList extends React.Component {
	state = {
		description: ''
  };
  
  dispatchItem = async () => {
    console.log('dispatch');
		const { listID, list, connectionID } = this.props;
		const {description } = this.state;
    const collectionSet = firestore.doc(`connections/${connectionID}/userData/list`);
    try {
      await collectionSet.update({
        [listID]: {
          name: list.name,
          date: list.date,
          items: [...list.items, description]
        }
      });
    }catch (error) {
      alert('error sending list item', error.message);
    }
  };
  
  removeItem = async (itemRemove) => {
    console.log('dispatch');
		const { listID, list, connectionID } = this.props;
		const {description } = this.state;
    const collectionSet = firestore.doc(`connections/${connectionID}/userData/list`);
    try {
      await collectionSet.update({
        [listID]: {
          name: list.name,
          date: list.date,
          items: list.items.filter(item => item !== itemRemove)
        }
      });
    }catch (error) {
      alert('error sending list item', error.message);
    }
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { list,listID } = this.props;
		return (
			<div className="todo-list mt-30 mb-30">
				<Collapse defaultActiveKey={[ '1' ]} className="todo-list-items">
          <Panel header={<div className="todo-list-title">{list&&list.name.toUpperCase()}</div>} key="1">
						<Input.Search
							size="large"
							className="mb-20"
							name="description"
							placeholder="Add item to list"
							onChange={this.handleChange}
							value={this.state.description}
              enterButton={<MdAddCircle style={{ fontSize: '1.7rem' }} onClick={this.dispatchItem}/>}
						/>
            {list.items.length ? list.items.map((item, index) => <ItemList key={index} item={item} removeItem={this.removeItem}/>) :<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
					</Panel>
				</Collapse>
				<Button className="button-size list-button" size="large" type="primary" onClick={()=> this.props.deleteItem(listID)}>
					Delete List
				</Button>
			</div>
		);
	}
}

export default TodoList;
