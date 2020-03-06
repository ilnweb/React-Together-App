import React from 'react';
import './add-spending.scss';
import FormAdd from '../form/form.cmp';
import { PlusCircleFilled  } from '@ant-design/icons';

import { Collapse } from 'antd';

const genExtra = () => <PlusCircleFilled className="color-primary"/>;

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
