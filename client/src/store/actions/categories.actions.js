import * as actions from "./index";
import axios from "axios";

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const categories = await axios.get("/api/categories/all");
      dispatch(actions.getCategories(categories.data));
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};
