import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
// import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import eventReducer from './reducers/eventReducer';
import roleReducer from './reducers/roleReducer';

const rootReducer = combineReducers({
  role: roleReducer,
  event: eventReducer,
});

const configureStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);



// const persistConfig = {
//   key: 'root',
//   storage,
// }
 
// const persistedReducer = persistReducer(persistConfig, rootReducer)
 
// export const pStore = createStore(persistedReducer)

// export const persistor = persistStore(pStore)

// export function () {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }


export default configureStore;

// export default () => {
//   let store = createStore(persistedReducer);
//   let persistor = persistStore(store);
//   return {store, persistor, configureStore};
// };
