import React from 'react';
import './notifications-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import Notification from '../../components/notification/notification.cpm';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setConnection } from '../../redux/connection/connection.actions';
import { acceptInvitation, declineNotigication,deleteNotigication,pullConnection } from '../../firebase/firebase.config';
import { MdArrowBack } from 'react-icons/md';
import { Empty } from 'antd';
import { withRouter } from "react-router";

class NotificationsPage extends React.Component {
	handleAccept = async (connection) => {
    await acceptInvitation(connection, this.props.currentUser.id);
    this.props.history.push("/connections")
	};

	handleDecline = (connection) => {
		declineNotigication(connection, this.props.currentUser.id);
  };
  
  handleDelete = (notification) => {
		deleteNotigication(notification, this.props.currentUser.id);
  };
  
  handlePullconnection= (connection) => {
		pullConnection(connection.connectionId, this.props.setConnection, this.props.currentUser.id);
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
                  handleDelete={this.handleDelete}
                  handlePullconnection={this.handlePullconnection}
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
const mapDispatchToProps = (dispatch) => ({
	setConnection: (connection) => dispatch(setConnection(connection))
});
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NotificationsPage));
