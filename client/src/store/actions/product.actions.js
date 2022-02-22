import * as actions from "./index";
import axios from "axios";
import { getAuthHeader } from "../../utills/tolls";

export const productsByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const products = await axios.post("/api/products/paginate/all", {
        page: args.page,
        brands: args.brands,
        keywords: args.keywords,
      });

      dispatch(actions.paginateProducts(products.data));
    } catch (err) {
      console.log(err.response);
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/product/${id}`, getAuthHeader());

      dispatch(actions.successGlobal("Produkt został usunięty"));
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};
