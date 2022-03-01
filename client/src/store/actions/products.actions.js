import * as actions from "./index";
import axios from "axios";
import { getAuthHeader, getTokenCookie } from "../../utills/tolls";

export const productsByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const products = await axios.post("/api/products/paginate/all", {
        brands: args.brands,
        keywords: args.keywords,
        size: args.size,
        categories: args.categories,
        min: args.min,
        max: args.max,
        limit: args.limit,
        sortBy: args.sortBy,
        page: args.page,
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

export const addProduct = (values) => {
  return async (dispatch) => {
    try {
      console.log(values);
      const productAdded = await axios.post(
        `/api/products/product`,
        {
          name: values.name,
          description: values.description,
          properties: values.properties,
          brand: values.brand,
          price: values.price,
          size: {
            s: values.s,
            m: values.m,
            l: values.l,
            xl: values.xl,
            xxl: values.xxl,
          },
          shipping: values.shipping,
          category: values.category,
        },
        getAuthHeader()
      );

      if (productAdded && values.file.length > 0) {
        // If product was successfully created with no error, i want to prepare the images to upload if there are any
        let images = new FormData();
        for (let i = 0; i < values.file.length; i++) {
          images.append("filesss", values.file[i]);
        }
        //i also need to send the id of created product, cuz i will need it to upload the product images
        images.append("id", productAdded.data._id);
        console.log(images.getAll("id"));
        axios
          .post("/api/products/upload_img", images, {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${getTokenCookie()}`,
            },
          })
          .then((res) => {
            dispatch(actions.successGlobal("Produkt został dodany"));
          })
          .catch((err) =>
            dispatch(actions.errorGlobal(err.response.data.message))
          );
      } else if (productAdded) {
        dispatch(actions.successGlobal("Produkt został dodany"));
      }
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};
