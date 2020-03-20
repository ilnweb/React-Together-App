import { createSelector } from 'reselect';

const selectConnection = state => state.connection;

export const selectConnectionData = createSelector(
  [selectConnection],
  connection => connection.connectionData
);

// export const selectSpendingsExpTotal = createSelector(
//   [selectSpendingsItems],
//   spendingItems => spendingItems ? spendingItems.reduce(
//     (sumTotal, item) =>  item.type === 'exp' ? sumTotal + parseInt(item.amount) : sumTotal , 0): null
// );

// export const selectSpendingsIncTotal = createSelector(
//   [selectSpendingsItems],
//   spendingItems =>  spendingItems ? spendingItems.reduce(
//     (sumTotal, item) => item.type === 'inc' ? sumTotal + parseInt(item.amount) : sumTotal , 0) : null
// );
