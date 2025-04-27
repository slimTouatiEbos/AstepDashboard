import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { thunk } from "redux-thunk";
import measurementReducer from "./reducers/measurmentReducers";

const uiReducer = (state = true, action) => {
  switch (action.type) {
    case 'setSidebar':
      return action.sidebarShow;
    default:
      return state;
  }
};

const tableReducer = (state = 1, action) => {
  switch (action.type) {
    case 'setTablePage':
      return action.mandrekaTablePage;
    default:
      return state;
  }
};

// Combine reducers with flat keys
const rootReducer = combineReducers({
  sidebarShow: uiReducer,
  mandrekaTablePage: tableReducer,
  measurement:measurementReducer
});  



// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Persistor for usage with PersistGate
const persistor = persistStore(store);

export { store, persistor };
