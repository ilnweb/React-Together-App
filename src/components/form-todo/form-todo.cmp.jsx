import React from 'react';
import './form-todo.cmp';
import { Button, Input, Form, Radio } from 'antd';
import { MdAttachMoney, MdModeEdit } from 'react-icons/md';

class FormToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			name: ''
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { name } = this.state;

		if (name === '') {
			this.setState({ formNotFilled: true });
			return;
		}
		const id = () => {
			return '_' + Math.random().toString(36).substr(2, 9);
		};
		const date = new Date();
		const months = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC' ];
		let formatDate = date.getDate() + '/' + months[date.getMonth()] + '/' + date.getFullYear();

		this.props.dispatchItem({
			[id()]: {
        name: name,
        date:formatDate,
        items:[]
			}
		});

		this.setState({
			name: '',
			formNotFilled: false
		});
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};
	render() {
		return (
			<Form className="item-form flex-c-c">
				<h3 className="mb-0">Create New To-do List</h3>
				<Input
					id="name"
					name="name"
					type="text"
					label="Name"
					placeholder="Name"
					suffix={<MdModeEdit style={{ color: 'rgba(0,0,0,.25)' }} />}
					onChange={this.handleChange}
					value={this.state.description}
					size="large"
				/>
				<Button type="primary" size="large" className="mt-0" onClick={this.handleSubmit}>
					ADD
				</Button>
			</Form>
		);
	}
}

export default FormToDo;
