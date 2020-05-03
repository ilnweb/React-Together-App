import React from 'react';
import './user-profile.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import { Avatar, Button } from 'antd';
import { MdArrowBack } from 'react-icons/md';

class UserProfile extends React.Component {
	render() {
		const { currentUser } = this.props;
		return (
			<div className="user-profile">
				<HeaderContainer>
					<MdArrowBack className="back-button" onClick={() => this.props.history.goBack()} />
					<h1>Your Profile</h1>
				</HeaderContainer>
				<div className="user-profile-display mt-30 flex-c-c p-30">
					<Avatar className="avatar-picture" size={100} src={currentUser && currentUser.photoURL} />
					<h2 className="mt-20 black">{currentUser && currentUser.displayName}</h2>
					<h2 className="black">{currentUser && currentUser.email}</h2>
					<Button type="primary" size="large" className="mt-15">
						Delete Profile
					</Button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
