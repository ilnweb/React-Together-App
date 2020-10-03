import React from 'react';
import './spendings-page.scss';
import TabSpendings from '../../components/tabs-spending/tabs-spending.cmp';
import AddSpending from '../../components/add-spending/add-spending.cmp';
import FormAdd from '../../components/form/form.cmp';
import User from '../../components/user/user.cmp';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import { firestore } from '../../firebase/firebase.config';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { addItem } from '../../redux/spendings/spending.actions';
import { removeItem } from '../../redux/spendings/spending.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { selectSpendingsExpTotal, selectSpendingsIncTotal } from '../../redux/spendings/spendings.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.cmp';

const TabSpendingsWithSpinner = WithSpinner(TabSpendings);
const UserWithSpinner = WithSpinner(User);

class SpendingPage extends React.Component {
	state = {
		isLoading: true
	};

	componentDidMount() {
		// const { setUserSpending, currentUser } = this.props;
		// const collectionRef = firestore.doc(`users/${currentUser.id}`);
		// collectionRef.get().then((snapshot) => {
		// 	const items = snapshot.data().spendings;
		// 	setUserSpending(items);
		// 	this.setState({ isLoading: false });
		// });
  }
  
  dispatchItem = (readyItem) => {
    const { addItem, currentUser } = this.props;
    const collectionSet = firestore.doc(`users/${currentUser.id}`);
    collectionSet.update({
      spendings: firebase.firestore.FieldValue.arrayUnion({
        ...readyItem
      })
    })

    addItem({
      ...readyItem
		});
  }

	render() {
		const { currentUser, totalExp, totalInc, removeItem } = this.props;
		return (
			<div className="spending">
        <HeaderContainer>
        <div className='page-title'>Personal Spendings</div>
					<UserWithSpinner
					
						currentUser={currentUser}
						totalExp={totalExp}
						totalInc={totalInc}
						income={true}
					/>
				</HeaderContainer>
				<AddSpending>
          <FormAdd dispatchItem={this.dispatchItem} showType/>
				</AddSpending>
				<div className="spending-list">
          <TabSpendingsWithSpinner removeItem={removeItem}/>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	totalExp: selectSpendingsExpTotal,
	totalInc: selectSpendingsIncTotal
});

export default connect(mapStateToProps, mapDispatchToProps)(SpendingPage);
