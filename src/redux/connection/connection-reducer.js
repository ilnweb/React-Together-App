import { connectionTypes } from './connection-type';

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
		default:
			return state;
	}
};

export default connectionReducer;
