import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import spendingsReducer from './spendings/spendings-reducer';
import connectionReducer from './connection/connection-reducer';

const persisitConfig = {
  key: 'root',
  storage,
  whitelist:[]
}

 const rootReducer = combineReducers({
  user: userReducer,
  spendings: spendingsReducer,
  connection: connectionReducer
});

export default persistReducer(persisitConfig, rootReducer);