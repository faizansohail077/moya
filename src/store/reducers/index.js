import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import AppReducer from "./App";

export default combineReducers({
  auth: AuthReducer,
  app: AppReducer,
});
