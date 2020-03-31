import React from 'react';
import './connections-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import UserConnect from '../../components/user-connect/user-connect.cmp';
import AddSpending from '../../components/add-spending/add-spending.cmp';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectConnectionData } from '../../redux/connection/connection.selectors';
import { createStructuredSelector } from 'reselect';
import { Collapse } from 'antd';

const { Panel } = Collapse;
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
				<HeaderContainer>
					<div className="flex-c-c">
						<h2 className="mb-20">Work project</h2>
						<img className="conect-img" src={connection && connection.connectionImg} alt="" />
						<h2 className="mt-20 mb-0">Total spent :</h2>
						<h2>4305$</h2>
					</div>
        </HeaderContainer>
        <AddSpending/>
				<div className="connection-users flex-c-c p-20 mb-50 ">
					<Collapse bordered={false} defaultActiveKey={[ '1' ]}>
						<Panel className="user-header" header={<UserConnect item={currentUser} small />} key="1">
            <UserConnect  item={currentUser} small />
            <UserConnect  item={currentUser} small />
            <UserConnect  item={currentUser} small />
						</Panel>
						{connection &&
							Object.keys(connection.users).map(
								(key) =>
									key !== currentUser.id ? (
										<Panel className="user-header" header={<UserConnect key={key} item={connection.users[key]} small />}>
                    <UserConnect key={key} item={connection.users[key]} small />
                    <UserConnect key={key} item={connection.users[key]} small />
                    <UserConnect key={key} item={connection.users[key]} small />
										</Panel>
									) : (
										''
									)
							)}
					</Collapse>
				</div>
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
