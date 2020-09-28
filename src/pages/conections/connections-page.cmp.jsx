import React from 'react';
import './connections-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import UserConnect from '../../components/user-connect/user-connect.cmp';
import AddSpending from '../../components/add-spending/add-spending.cmp';
import FormAdd from '../../components/form/form.cmp';
import LoadingScreen from '../../components/loading-screen/loading-screen.cmp';
import ItemSpending from '../../components/item-spending/item-spending.cmp';
import { firestore, addNotification } from '../../firebase/firebase.config';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
	selectConnectionData,
	selectCurrentUrerTotalConnection,
	selectUsersTotalConnection
} from '../../redux/connection/connection.selectors';
import { addConnectionItem } from '../../redux/connection/connection.actions';
import { removeConnectionItem } from '../../redux/connection/connection.actions';
import { createStructuredSelector } from 'reselect';
import { Collapse, Empty } from 'antd';

const { Panel } = Collapse;

class ConnectionsPage extends React.Component {
	state = {
		isLoading: true,
		totalUsers: 0
	};

	addUserTotal = (total) => {
		this.setState((prevState) => ({
			totalUsers: prevState.totalUsers + total
		}));
	};

	dispatchItem = (readyItem) => {
		const { currentUser, connection, addConnectionItem } = this.props;
		const collectionSet = firestore.doc(`connections/${connection.id}/userData/spendings`);
		collectionSet.update({
			[currentUser.id]: firebase.firestore.FieldValue.arrayUnion({
				...readyItem
			})
		});

		addNotification(connection, currentUser, 'connections', 'added an item in');
		addConnectionItem({
			...readyItem
		});
	};

	render() {
		const { currentUser, connection, currentUserTotal, UsersTotal, removeConnectionItem } = this.props;
		return (
			<div className="connections-page">
				{!connection && (
					<LoadingScreen
						img="https://res.cloudinary.com/ilnphotography/image/upload/v1584784280/HomePage/undraw_mobile_testing_reah_dmknjs.svg"
						title="Connect with friends to track common spendings!"
						inside
            button
            mainTitle="Groups"
					/>
				)}
				<HeaderContainer>
					<div className="page-title">Group Spendings</div>
					<div className="flex-c-c">
						<h2 className="mb-10">{connection && connection.connectionName}</h2>
						<div
							className="conect-img"
							style={{ backgroundImage: `url(${connection && connection.connectionImg})` }}
							alt=""
						/>
						<h2 className="mt-10 mb-0">Total spent :</h2>
						<h2>{UsersTotal}$</h2>
					</div>
				</HeaderContainer>
				<AddSpending>
					<FormAdd dispatchItem={this.dispatchItem} />
				</AddSpending>
				<div className="connection-users flex-c-c mb-50 ">
					<Collapse bordered={false} defaultActiveKey={[ '1' ]}>
						<Panel
							className="user-header"
							header={<UserConnect item={currentUser} total={currentUserTotal} small />}
							key="1"
						>
							{connection && connection.userData.spendings[currentUser.id].length ? (
								this.props.connection.userData.spendings[currentUser.id]
									.slice(0)
									.reverse()
									.map((item) => (
										<ItemSpending key={item.id} item={item} removeItem={removeConnectionItem} itemDelete />
									))
							) : (
								<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
							)}
						</Panel>
						{connection &&
							Object.keys(connection.users).map((key, index) => {
								if (key !== currentUser.id) {
									const total = connection.userData.spendings[key].reduce(
										(acc, item) => acc + parseInt(item.amount),
										0
									);
									return (
										<Panel
											key={key + index}
											className="user-header"
											header={<UserConnect item={connection.users[key]} total={total} small />}
										>
											{connection.userData.spendings[key].length ? (
												connection.userData.spendings[key]
													.slice(0)
													.reverse()
													.map((item) => <ItemSpending key={item.id} item={item} />)
											) : (
												<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
											)}
										</Panel>
									);
								}
								return '';
							})}
					</Collapse>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	addConnectionItem: (item) => dispatch(addConnectionItem(item)),
	removeConnectionItem: (item) => dispatch(removeConnectionItem(item))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	connection: selectConnectionData,
	currentUserTotal: selectCurrentUrerTotalConnection,
	UsersTotal: selectUsersTotalConnection
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsPage);
