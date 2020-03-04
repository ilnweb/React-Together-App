import {spendingTypes} from './spending-type';

export const addItem = item => ({
  type:spendingTypes.ADD_ITEM,
  payload:item
});

export const removeItem = item => ({
  type:spendingTypes.REMOVE_ITEM,
  payload:item
});

export const setUserSpending = list => ({
  type:spendingTypes.SET_USER_SPENDING,
  payload:list
});