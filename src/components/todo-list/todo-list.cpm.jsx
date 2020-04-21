import React from 'react';
import './todo-list.scss';
import { Collapse, Empty, Button, Input } from 'antd';
import ItemList from '../list-item/list-item.cmp';
import { MdAddCircle } from 'react-icons/md';

const { Panel } = Collapse;

class TodoList extends React.Component {
	state = {
		description: ''
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		console.log(this.state);
		return (
			<div className="todo-list">
				<Collapse defaultActiveKey={[ '1' ]} className="todo-list-items">
					<Panel header={<div className="todo-list-title">SHOPPING</div>} key="1">
						<Input.Search
							size="large"
							className="mb-20"
							name="description"
							placeholder="Add item to list"
							onChange={this.handleChange}
							value={this.state.description}
							enterButton={<MdAddCircle style={{ fontSize: '1.7rem' }} />}
						/>
						<ItemList item={{ id: 1, description: 'Carrots' }} />
						<ItemList item={{ id: 1, description: 'Tomatos' }} />
						<ItemList item={{ id: 1, description: 'Cucumber' }} />
					</Panel>
				</Collapse>
				<Button className="button-size list-button" size="large" type="primary">
					Delete List
				</Button>
			</div>
		);
	}
}

export default TodoList;
