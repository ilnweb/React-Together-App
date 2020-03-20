import {connectionTypes} from './connection-type';

export const setConnection = data => ({
  type:connectionTypes.SET_USER_CONNECTION,
  payload:data
});