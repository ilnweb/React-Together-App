import { createSelector } from 'reselect';

const selectSpendings = state => state.spendings;

export const selectSpendingsItems = createSelector(
  [selectSpendings],
  spending => spending.spendingItems
);

export const selectSpendingsExpTotal = createSelector(
  [selectSpendingsItems],
  spendingItems => spendingItems.reduce(
    (sumTotal, item) => item.type === 'exp' ? sumTotal + parseInt(item.amount) : sumTotal, 0)
);

export const selectSpendingsIncTotal = createSelector(
  [selectSpendingsItems],
  spendingItems => spendingItems.reduce(
    (sumTotal, item) => item.type === 'inc' ? sumTotal + parseInt(item.amount) : sumTotal, 0)
);
