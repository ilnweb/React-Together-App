import React from 'react';
import './add-spending.scss';
import FormAdd from '../form/form.cmp';
import { Collapse, Icon } from 'antd';

const genExtra = () => <Icon type="plus-circle" className="color-primary" theme="filled" size="large" />;

export default function AddSpending() {
	const { Panel } = Collapse;

	return (
		<Collapse defaultActiveKey={[ '1' ]} expandIconPosition="left">
			<Panel header="ADD ITEM" key="1" extra={genExtra()}>
				<FormAdd />
			</Panel>
		</Collapse>
	);
}
