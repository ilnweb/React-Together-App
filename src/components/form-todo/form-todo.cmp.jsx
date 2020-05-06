import React from 'react';
import './form-todo.cmp';
import { Button, Input, Form } from 'antd';
import { MdModeEdit } from 'react-icons/md';

class FormToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			formNotFilled: false
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
			id: id(),
			name: name,
			date: formatDate,
			items: []
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
      <Form className="flex-c-c">
        <h3 className="mb-0">Create New To-do List</h3>
        {this.state.formNotFilled ? <div className="fail-message">Please check fields and try again!</div> : ''}
				<Input
					id="name"
					name="name"
          type="text"
          className="mt-10"
					label="Name"
					placeholder="Name"
					suffix={<MdModeEdit style={{ color: 'rgba(0,0,0,.25)' }} />}
					onChange={this.handleChange}
					value={this.state.name}
          size="large"
          onPressEnter={this.handleSubmit}
				/>
				<Button type="primary" size="large" className="mt-20" onClick={this.handleSubmit}>
					ADD
				</Button>
			</Form>
		);
	}
}

export default FormToDo;
