import * as actions from "./index";
import axios from "axios";

export const getBrands = () => {
  return async (dispatch) => {
    try {
      const brands = await axios.get("/api/brands/all");
      dispatch(actions.getBrands(brands.data));
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};
