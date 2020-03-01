import React from 'react';
import './tabs-spending.scss';
import ItemSpending from '../item-spending/item-spending.cmp';
import { connect } from 'react-redux';
import { selectSpendingsItems } from '../../redux/spendings/spendings.selectors';
import { createStructuredSelector } from 'reselect';
import { selectSpendingsExpTotal, selectSpendingsIncTotal } from '../../redux/spendings/spendings.selectors';
import { Tabs, Empty } from 'antd';

const TabSpendings = ({ spendingItems, totalExp, totalInc }) => {
	const { TabPane } = Tabs;
	return (
		<Tabs size="large" defaultActiveKey="1">
			<TabPane className="tab-full" tab="EXPENSE" key="1">
				{!totalExp ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : ''}
				{spendingItems.map((item) => (item.type === 'exp' ? <ItemSpending key={item.id} item={item} /> : ''))}
			</TabPane>
			<TabPane className="tab-full" tab="INCOME" key="2">
				{!totalInc ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : ''}
				{spendingItems.map((item) => (item.type === 'inc' ? <ItemSpending key={item.id} item={item} /> : ''))}
			</TabPane>
		</Tabs>
	);
};

const mapStateToProps = createStructuredSelector({
	spendingItems: selectSpendingsItems,
	totalExp: selectSpendingsExpTotal,
	totalInc: selectSpendingsIncTotal
});

export default connect(mapStateToProps)(TabSpendings);
