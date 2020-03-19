import React from 'react';
import './notifications-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import Notification from '../../components/notification/notification.cpm';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const NotificationsPage = ({currentUser}) => (
  <div className="notifications-page">
    <HeaderContainer>
      <h1>Your notifications</h1>
    </HeaderContainer>
    <div className="notifications-container m-10">
    {currentUser &&  <Notification item={currentUser.notifications[0]}/>}
    </div>
	</div>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(NotificationsPage);