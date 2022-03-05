import { combineReducers } from "redux";
import users from "./users.reducer";
import notifications from "./notifications.reducer";
import products from "./products.reducer";
import brands from "./brands.reducer";
import categories from "./categories.reducer";

const appReducers = combineReducers({
  users,
  notifications,
  products,
  brands,
  categories,
});

export default appReducers;
