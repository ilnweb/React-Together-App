import React from 'react';
import './connections-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import User from '../../components/user/user.cmp';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectConnectionData } from '../../redux/connection/connection.selectors';
import { createStructuredSelector } from 'reselect';
// import WithSpinner from '../../components/with-spinner/with-spinner.cmp';

// const UserWithSpinner = WithSpinner(User);

class ConnectionsPage extends React.Component {
	state = {
		isLoading: true
	};

	render() {
		const { currentUser, connection } = this.props;
		console.log(connection);
		return (
			<div className="connections-page">
        <HeaderContainer >
        <div className="flex-c-c">
					<h4 className="mb-20">Connection: {connection && connection.connectionName}</h4>
            <div className="flex-c">
              <User currentUser={currentUser} small/>
              {connection && Object.keys(connection.users).map(key => key !== currentUser.id ? <User key={key} currentUser={connection.users[key]} small /> :'')}
					</div>
					</div>
				</HeaderContainer>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	// setConnection: (connection) => dispatch(setConnection(connection))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	connection: selectConnectionData
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsPage);
