import React from 'react';
import './notifications-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import Notification from '../../components/notification/notification.cpm';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { acceptInvitation, declineNotigication } from '../../firebase/firebase.config';
import { MdArrowBack } from 'react-icons/md';
import { Empty } from 'antd';

class NotificationsPage extends React.Component {
	handleAccept = (connection) => {
		acceptInvitation(connection, this.props.currentUser.id);
	};

	handleDecline = (connection) => {
		declineNotigication(connection, this.props.currentUser.id);
	};

	render() {
		const { currentUser } = this.props;
		return (
			<div className="notifications-page">
				<HeaderContainer>
					<MdArrowBack className="back-button" onClick={() => this.props.history.goBack()} />
					<h1>Your notifications</h1>
				</HeaderContainer>
				<div className="notifications-container m-10 mt-20">
					{currentUser && currentUser.notifications.length ? (
						currentUser.notifications
							.map((item, index) => (
								<Notification
									key={index}
									item={item}
									handleAccept={this.handleAccept}
									handleDecline={this.handleDecline}
								/>
							))
							.reverse()
					) : (
						<Empty imageStyle={{ height: 150 }} description={<span>No notifications</span>} />
					)}
				</div>
			</div>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(NotificationsPage);
