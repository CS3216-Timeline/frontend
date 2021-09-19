import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { offline } from "redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";

const initialState = {};

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware), offline(offlineConfig))
);

export const persistor = persistStore(store);
