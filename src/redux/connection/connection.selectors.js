import { createSelector } from 'reselect';
import { authFB } from '../../firebase/firebase.config';


const selectConnection = state => state.connection;

export const selectConnectionData = createSelector(
  [selectConnection],
  connection => connection.connectionData
);

export const selectCurrentUrerTotalConnection = createSelector(
  [selectConnectionData],
  connectionData => connectionData ? connectionData.userData.spendings[authFB.currentUser.uid].reduce(
    (sumTotal, item) =>  sumTotal + parseInt(item.amount) , 0) : null
);

// export const selectSpendingsIncTotal = createSelector(
//   [selectSpendingsItems],
//   spendingItems =>  spendingItems ? spendingItems.reduce(
//     (sumTotal, item) => item.type === 'inc' ? sumTotal + parseInt(item.amount) : sumTotal , 0) : null
// );
