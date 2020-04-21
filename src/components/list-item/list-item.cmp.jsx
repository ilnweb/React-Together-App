import React from 'react';
import './list-item.scss';
import { MdDelete } from 'react-icons/md';
import { Checkbox } from 'antd';

// import Moment from 'react-moment';

const ItemList = ({ item, removeItem }) => {
	return (
		<div id={item.id} className="item-spending">
			<Checkbox/>
			<div className="item-data">
				<div className="item-description">{item.description.toUpperCase()}</div>
			</div>
			<div className="flex-c">
				<MdDelete className="item-delete icon-standart" onClick={() => removeItem(item)} />
			</div>
		</div>
	);
};

export default ItemList;
