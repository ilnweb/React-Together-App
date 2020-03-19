import React from 'react';
import './notifications-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import Notification from '../../components/notification/notification.cpm';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { acceptInvitation } from '../../firebase/firebase.config';

class NotificationsPage extends React.Component {

  handleAccept = (connectionId) => {
    console.log(connectionId);
    acceptInvitation(connectionId.connectionId, this.props.currentUser.id)
  }

  render() {
    const { currentUser } = this.props;
		return (
			<div className="notifications-page">
				<HeaderContainer>
					<h1>Your notifications</h1>
				</HeaderContainer>
				<div className="notifications-container m-10">
          {currentUser && <Notification item={currentUser.notifications[0]} handleAccept={this.handleAccept}/>}
				</div>
			</div>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(NotificationsPage);
