import React from 'react';
import './user.scss';
import { connect } from 'react-redux';
import { selectSpendingsExpTotal, selectSpendingsIncTotal } from '../../redux/spendings/spendings.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { Avatar } from 'antd';

const User = ({ currentUser, reverce, totalExp, totalInc }) => {
	const userName = currentUser ? currentUser.displayName.split(' ').slice(0, 1) :'';
	const avatarLetter = userName ? userName[0].split('')[0].toUpperCase():'';
	return (
		<div className={`user ${reverce ? 'user-reverce' : ''}`}>
			<div className="user-img">
				{currentUser.photoURL ? (
					<Avatar className="avatar-picture" size={70} src={currentUser.photoURL} />
				) : (
					<Avatar className="avatar-no-picture" size={70}>
						{avatarLetter}
					</Avatar>
				)}
				<h1 className="user-name">{userName}</h1>
			</div>
			<div className="user-spend user-inc">
				Total Income : <span>+ {totalInc} zl.</span>{' '}
			</div>
			<div className="user-spend user-exp">
				Total Expense : <span>- {totalExp} zl.</span>{' '}
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	totalExp: selectSpendingsExpTotal,
	totalInc: selectSpendingsIncTotal
});

export default connect(mapStateToProps)(User);
