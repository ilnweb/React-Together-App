import React from 'react';
import './user.scss';
import { Avatar } from 'antd';

const User = ({ currentUser, reverce, totalExp, totalInc, income, small }) => {
	const userName = currentUser && currentUser.displayName.split(' ').slice(0, 1);
	const avatarLetter = userName && userName[0].split('')[0].toUpperCase();
	return (
		<div className={`user mt-5 ${reverce ? 'user-reverce' : ''}`}>
			<div className="user-img">
				{currentUser.photoURL ? (
					<Avatar className="avatar-picture" size={small ? 50 : 70} src={currentUser.photoURL} />
				) : (
					<Avatar className="avatar-no-picture" size={small ? 50 : 70}>
						<span style={{paddingRight:"1px", paddingBottom:"2px"}}>{avatarLetter}</span>
					</Avatar>
				)}
				<h1 className="user-name">{userName}</h1>
			</div>
			<div className="flex-c totals-conatiner">
				<div className="user-spend  user-exp  flex-c-c">
					Total Expense : <span>- {totalExp} zl.</span>{' '}
				</div>
				{income ? (
					<div className="user-spend user-inc flex-c-c">
						Total Income : <span>+ {totalInc} zl.</span>{' '}
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default User;
