import React from 'react';
import './spendings-page.scss';
import TabSpendings from '../../components/tabs-spending/tabs-spending.cmp';
import AddSpending from '../../components/add-spending/add-spending.cmp';
import User from '../../components/user/user.cmp';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import { firestore } from '../../firebase/firebase.config';
import { connect } from 'react-redux';
import { setUserSpending } from '../../redux/spendings/spending.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { selectSpendingsExpTotal, selectSpendingsIncTotal } from '../../redux/spendings/spendings.selectors';


class SpendingPage extends React.Component {
	componentDidMount() {
		const { setUserSpending, currentUser } = this.props;

		const collectionRef = firestore.doc(`users/${currentUser.id}`);
		collectionRef.get().then( (snapshot) => {
			const items = snapshot.data().spendings;
			setUserSpending(items);
		});
	}

  render() {
    const { currentUser, totalExp, totalInc } = this.props;
		return (
			<div className="spending">
				<HeaderContainer>
          <User currentUser={currentUser} totalExp={totalExp} totalInc={totalInc} income={true} />
				</HeaderContainer>
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
  currentUser: selectCurrentUser,
  totalExp: selectSpendingsExpTotal,
	totalInc: selectSpendingsIncTotal
});

export default connect(mapStateToProps, mapDispatchToProps)(SpendingPage);
