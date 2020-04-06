import { connectionTypes } from './connection-type';
import { authFB } from '../../firebase/firebase.config';
import { removeConnectionItem } from './connection.ustils';

const INITIAL_STATE = {
	connectionData: null
};

const connectionReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
      case connectionTypes.SET_USER_CONNECTION:
        return {
          ...state,
          connectionData: action.payload
      };
      case connectionTypes.ADD_CONNECTION_ITEM:
        return {
          ...state,
          connectionData: { 
            ...state.connectionData,
            userData: {
              ...state.connectionData.userData,
              spendings: {
                ...state.connectionData.userData.spendings,
                [authFB.currentUser.uid]:[...state.connectionData.userData.spendings[authFB.currentUser.uid],action.payload]
              }
            }
          }
      };
      case connectionTypes.REMOVE_CONNECTION_ITEM:
        return {
          ...state,
          connectionData: { 
            ...state.connectionData,
            userData: {
              ...state.connectionData.userData,
              spendings: {
                ...state.connectionData.userData.spendings,
                [authFB.currentUser.uid]: removeConnectionItem(state.connectionData.userData.spendings[authFB.currentUser.uid],action.payload,state.connectionData.id)
              }
            }
          }
        };
		default:
			return state;
	}
};


export default connectionReducer;

