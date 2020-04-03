import React from 'react';
import './connections-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import UserConnect from '../../components/user-connect/user-connect.cmp';
import AddSpending from '../../components/add-spending/add-spending.cmp';
import FormAdd from '../../components/form/form.cmp';
import LoadingScreen from '../../components/loading-screen/loading-screen.cmp';
import { firestore } from '../../firebase/firebase.config';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectConnectionData } from '../../redux/connection/connection.selectors';
import { createStructuredSelector } from 'reselect';
import { Collapse, Empty } from 'antd';
// import WithSpinner from '../../components/with-spinner/with-spinner.cmp';
// const UserWithSpinner = WithSpinner(User);
const { Panel } = Collapse;


class ConnectionsPage extends React.Component {
	state = {
		isLoading: true
  };
  
  dispatchItem = (readyItem) => {
    const {currentUser, connection } = this.props;
    const collectionSet = firestore.doc(`connections/${connection.id}/userData/spendings`);
    collectionSet.update({
      [currentUser.id]: firebase.firestore.FieldValue.arrayUnion({
        ...readyItem
      })
    })
  }

	render() {
		const { currentUser, connection } = this.props;
		console.log(connection);
		return (
			<div className="connections-page">
				{connection ? ('') : (
					<LoadingScreen
						img="https://res.cloudinary.com/ilnphotography/image/upload/v1584784280/HomePage/undraw_mobile_testing_reah_dmknjs.svg"
						title="Connect with friends to track common spendings!"
						inside
						button
					/>
				)}
				<HeaderContainer>
					<div className="flex-c-c">
						<h2 className="mb-20">{connection && connection.connectionName}</h2>
						<img className="conect-img" src={connection && connection.connectionImg} alt="" />
						<h2 className="mt-20 mb-0">Total spent :</h2>
						<h2>4305$</h2>
					</div>
				</HeaderContainer>
				<AddSpending>
          <FormAdd dispatchItem={this.dispatchItem}/>
				</AddSpending>
				<div className="connection-users flex-c-c p-20 mb-50 ">
					<Collapse bordered={false} defaultActiveKey={[ '1' ]}>
						<Panel className="user-header" header={<UserConnect item={currentUser} small />} key="1">
							<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
						</Panel>
						{connection &&
							Object.keys(connection.users).map(
								(key, index) =>
									key !== currentUser.id ? (
										<Panel
											key={key + index}
											className="user-header"
											header={<UserConnect item={connection.users[key]} small />}
										>
											<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
										</Panel>) : ('')
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
