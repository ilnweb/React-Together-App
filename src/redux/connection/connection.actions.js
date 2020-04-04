import {connectionTypes} from './connection-type';

export const setConnection = data => ({
  type:connectionTypes.SET_USER_CONNECTION,
  payload:data
});

export const addConnectionItem = item => ({
  type:connectionTypes.ADD_CONNECTION_ITEM,
  payload:item
});

export const removeConnectionItem = item => ({
  type:connectionTypes.REMOVE_CONNECTION_ITEM,
  payload:item
});