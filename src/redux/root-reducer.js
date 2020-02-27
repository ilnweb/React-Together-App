import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import spendingsReducer from './spendings/spendings-reducer';

const persisitConfig = {
  key: 'root',
  storage,
  whitelist:['spendings']
}

 const rootReducer = combineReducers({
  user: userReducer,
  spendings: spendingsReducer
});

export default persistReducer(persisitConfig, rootReducer);