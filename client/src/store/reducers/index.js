import { combineReducers } from "redux";
import users from "./users.reducer";
import notifications from "./notifications.reducer";
import products from "./products.reducer";

const appReducers = combineReducers({
  users,
  notifications,
  products,
});

export default appReducers;
