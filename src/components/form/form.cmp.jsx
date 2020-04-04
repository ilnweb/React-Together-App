import React from 'react';
import './form.scss';
import { Button, Input, Form, Radio } from 'antd';
import { MdAttachMoney, MdModeEdit } from "react-icons/md";



class FormAdd extends React.Component {
	constructor() {
		super();
		this.state = {
			description: '',
			amount: '',
      type: "exp",
      formNotFilled:false
		};
  }
  
	handleSubmit = (e) => {
		e.preventDefault();
    const { description, amount, type } = this.state;

    if (description === '' || amount === '' || type === '') {
      this.setState({ formNotFilled: true });
      return;
    }
		const id = () => {
			return '_' + Math.random().toString(36).substr(2, 9);
    };
    const date = new Date();
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let formatDate = date.getDate() + "/" +  months[date.getMonth()]  + "/" + date.getFullYear();

    this.props.dispatchItem({
      id: id(),
      date:formatDate,
			description: description,
			amount: amount,
			type: type
		});

		this.setState({
			description: '',
			amount: '',
      formNotFilled: false
		});
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};
  render() {
    const { showType } = this.props;
		return (
			<Form className="item-form flex-c-c">
				{ showType && <Radio.Group name="type">
					<div className="flex-c">
						<Radio onChange={this.handleChange} value="exp" >
							Expense
						</Radio>

						<Radio onChange={this.handleChange} value="inc" >
							Income{' '}
						</Radio>
					</div>
        </Radio.Group>}
        {this.state.formNotFilled ? <div className="fail-message">Please check fields and try again!</div> : ''}
				<Input
					id="description"
					name="description"
					className="input-style"
					type="text"
					label="Description"
					placeholder="Description"
					suffix={<MdModeEdit style={{ color: 'rgba(0,0,0,.25)' }} />}
					onChange={this.handleChange}
					value={this.state.description}
					size="large"
				/>
				<Input
					id="amount"
					name="amount"
					className="input-style"
					type="number"
					label="Amount"
					placeholder="Amount"
					suffix={<MdAttachMoney style={{ color: 'rgba(0,0,0,.25)' }} />}
					onChange={this.handleChange}
					value={this.state.amount}
					size="large"
				/>
				<Button type="primary" size="large" className="mt-15" onClick={this.handleSubmit}>ADD</Button>
			</Form>
		);
	}
}

export default FormAdd;
