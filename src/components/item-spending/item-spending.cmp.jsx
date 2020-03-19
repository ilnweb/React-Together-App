import React from 'react';
import './item-spending.scss';
import { removeItem } from '../../redux/spendings/spending.actions';
import { connect } from 'react-redux';
import { DeleteFilled } from '@ant-design/icons';
// import Moment from 'react-moment';

const ItemSpending = ({ item, removeItem }) => {
	return (
		<div id={item.id} className="item-spending">
			<div className="item-data">
				<div className="item-description">{item.description.toUpperCase()}</div>
				<p>{item.date}</p>
			</div>
			<div className="flex-c">
				<div className={`item-amount ${item.type === 'exp' ? 'item-red' : 'item-green'}`}>
					{item.type === 'exp' ? '-' : '+'} {item.amount}
				</div>
					<DeleteFilled className="item-delete" onClick={() => removeItem(item)} />
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	removeItem: (item) => dispatch(removeItem(item))
});

const mapStateToProps = (state) => ({
	spendingItems: state.spendings
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemSpending);
