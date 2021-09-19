import { combineReducers } from "redux";
import auth from "./authReducer";
import alerts from "./alertReducer";
import lines from "./lineReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // this is the localStorage

// https://www.youtube.com/watch?v=Fb-bDigImpw
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "lines"], // string name of the reducers
};

const rootReducer = combineReducers({
  auth,
  alerts,
  lines,
});

export default persistReducer(persistConfig, rootReducer);
