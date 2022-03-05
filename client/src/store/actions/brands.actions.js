import * as actions from "./index";
import axios from "axios";
import { getAuthHeader } from "../../utills/tolls";

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

//I will probably use that function only once so i could do it in a component, but i think i will try to keep the component lean this time, and practice redux a bit more :)
export const deleteBrandCategory = (value, id) => {
  return async (dispatch) => {
    try {
      console.log(value);
      console.log(id);
      const url =
        value === "brand"
          ? `/api/brands/brand/${id}`
          : `/api/categories/category/${id}`;

      await axios.delete(url, getAuthHeader());

      dispatch(
        actions.successGlobal(
          `${value === "brand" ? "Marka" : "Kategoria"} została usunięta `
        )
      );
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};
