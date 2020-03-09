import React from 'react';
import './connections-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import User from '../../components/user/user.cmp';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';


const ConnectionsPage = ({currentUser}) => (
	<div className="connections-page">
		<HeaderContainer>
    <User currentUser={currentUser} />
    <User currentUser={currentUser} />
		</HeaderContainer>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	// setUserSpending: (list) => dispatch(setUserSpending(list))
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsPage);
