import React from 'react';
import './connections-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import User from '../../components/user/user.cmp';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import WithSpinner from '../../components/with-spinner/with-spinner.cmp';

const UserWithSpinner = WithSpinner(User);

class ConnectionsPage extends React.Component {
	state = {
		isLoading: true
	};

  render() {
    const { currentUser } = this.props;
    const { isLoading } = this.state;
		return (
			<div className="connections-page">
        <HeaderContainer>
          <UserWithSpinner currentUser={currentUser} isLoading={isLoading}/>
					<UserWithSpinner currentUser={currentUser} isLoading={isLoading}/>
				</HeaderContainer>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	// setUserSpending: (list) => dispatch(setUserSpending(list))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsPage);
