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
import WithSpinner from '../../components/with-spinner/with-spinner.cmp';

const TabSpendingsWithSpinner = WithSpinner(TabSpendings);


class SpendingPage extends React.Component {
  state = {
    isLoading:true
  }
	componentDidMount() {
		const { setUserSpending, currentUser } = this.props;

		const collectionRef = firestore.doc(`users/${currentUser.id}`);
		collectionRef.get().then( (snapshot) => {
			const items = snapshot.data().spendings;
      setUserSpending(items);
      this.setState({ isLoading: false });
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
          <TabSpendingsWithSpinner isLoading={this.state.isLoading}/>
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
