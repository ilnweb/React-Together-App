import React from 'react';
import './item-spending.scss';
import { MdDelete } from "react-icons/md";
// import Moment from 'react-moment';

const ItemSpending = ({ item, removeItem, itemDelete }) => {
	return (
		<div id={item.id} className="item-spending">
			<div className="item-data">
				<div className="item-description">{item.description.toUpperCase()}</div>
				<p>{item.date}</p>
			</div>
			<div className="flex-c">
				<div className={`item-amount ${item.type === 'exp' ? 'item-red' : 'item-green'}`}>
					{item.type === 'exp' ? '-' : '+'} {item.amount} $
        </div>
        {itemDelete && <MdDelete className="item-delete icon-standart" onClick={() => removeItem(item)} />}
					
			</div>
		</div>
	);
};

export default ItemSpending;
