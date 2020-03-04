import React from 'react';
import './spendings-page.scss';
import TabSpendings from '../../components/tabs-spending/tabs-spending.cmp';
import AddSpending from '../../components/add-spending/add-spending.cmp';
import User from '../../components/user/user.cmp';
import { firestore } from '../../firebase/firebase.config';
import { connect } from 'react-redux';
import { setUserSpending } from '../../redux/spendings/spending.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class SpendingPage extends React.Component {
	unsubscribeFromsnapshot = null;

  componentDidMount() {
    const { setUserSpending, currentUser } = this.props;
    
		const collectionRef = firestore.doc(`users/${currentUser.id}`);
		collectionRef.onSnapshot(async (snapshot) => {
			const items = await snapshot.data().spendings;
      setUserSpending(items);

		});
   
	}

	render() {
		return (
			<div className="spending">
				<div className="spending-header">
					<User />
				</div>
				<AddSpending />
				<div className="spending-list">
					<TabSpendings />
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setUserSpending: (list) => dispatch(setUserSpending(list))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});


export default connect(mapStateToProps, mapDispatchToProps)(SpendingPage);
