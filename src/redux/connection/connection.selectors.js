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

export const selectUsersTotalConnection = createSelector(
  [selectConnectionData],
  connectionData => connectionData ? Object.keys(connectionData.userData.spendings).reduce((acc, key) => acc + connectionData.userData.spendings[key].reduce(
    (sumTotal, item) => connectionData.userData.spendings[key] !== authFB.currentUser.uid ?  sumTotal + parseInt(item.amount):'', 0),0 
    ) : null
);

