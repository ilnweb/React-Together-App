import { spendingTypes } from './spending-type';

const INITIAL_STATE = {
	spendingItems: []
};

const spendingsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case spendingTypes.ADD_ITEM:
			return {
				...state,
				spendingItems: [ ...state.spendingItems, action.payload ]
			};
		case spendingTypes.REMOVE_ITEM:
			return {
				...state,
				spendingItems: state.spendingItems.filter((item) => item.id !== action.payload.id)
      };
      case spendingTypes.SET_USER_SPENDING:
        return {
          ...state,
          spendingItems: action.payload
        };
		default:
			return state;
	}
};

export default spendingsReducer;
