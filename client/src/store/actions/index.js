import {
  BRAND_GET_ALL,
  NOTIF_CLEAR,
  NOTIF_ERROR_GLOBAL,
  NOTIF_SUCCESS_GLOBAL,
  PROD_GET_PAGINATE,
  USER_AUTH,
  USER_EDIT_EMAIL,
  USER_EDIT_PROFILE,
  USER_SIGN_OUT,
  CATG_GET_ALL,
  PROD_ADD,
  USER_CART_ADD,
  USER_CART_REMOVE,
} from "../types";

export const userAuthenticate = (user) => ({
  type: USER_AUTH,
  payload: user,
});

export const errorGlobal = (msg) => ({
  type: NOTIF_ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg, time) => ({
  type: NOTIF_SUCCESS_GLOBAL,
  payload: msg,
  time: time,
});

export const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: NOTIF_CLEAR,
    });
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGN_OUT,
    });
  };
};

export const updateProfile = (data) => {
  return (dispatch) => {
    dispatch({
      type: USER_EDIT_PROFILE,
      payload: data,
    });
  };
};

export const updateEmail = (data) => {
  return (dispatch) => {
    dispatch({
      type: USER_EDIT_EMAIL,
      payload: data,
    });
  };
};

export const paginateProducts = (data) => {
  return (dispatch) => {
    dispatch({
      type: PROD_GET_PAGINATE,
      payload: data,
    });
  };
};

export const getBrands = (data) => {
  return (dispatch) => {
    dispatch({
      type: BRAND_GET_ALL,
      payload: data,
    });
  };
};

export const getCategories = (data) => {
  return (dispatch) => {
    dispatch({
      type: CATG_GET_ALL,
      payload: data,
    });
  };
};

export const AddProduct = (data) => {
  return (dispatch) => {
    dispatch({
      type: PROD_ADD,
      payload: data,
    });
  };
};

export const userAddToCart = (data) => ({
  type: USER_CART_ADD,
  payload: data,
});

export const userRemoveFromCart = (data) => ({
  type: USER_CART_REMOVE,
  payload: data,
});
