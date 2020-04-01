import React from 'react';
import './add-spending.scss';
import FormAdd from '../form/form.cmp';
import { MdAddCircle  } from "react-icons/md";

import { Collapse } from 'antd';



export default function AddSpending() {
	const { Panel } = Collapse;

	return (
		<Collapse expandIconPosition="left">
			<Panel header={<div className="flex-c"> <MdAddCircle className="plus-icon color-primary"/></div> } key="1" showArrow={false}>
				<FormAdd />
			</Panel>
		</Collapse>
	);
}
