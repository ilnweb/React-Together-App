import React from 'react';
import './spendings-page.scss';
import TabSpendings from '../../components/tabs-spending/tabs-spending.cmp';
import AddSpending from '../../components/add-spending/add-spending.cmp';
import User from '../../components/user/user.cmp';

const SpendingPage = () => (
	<div className="spending">
		<div className="spending-header">
			<User />
		</div>
		<AddSpending />
		<div className="spending-list">
			<TabSpendings />
		</div>
	</div>
);

export default SpendingPage;
