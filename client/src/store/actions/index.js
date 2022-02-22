import {
  NOTIF_CLEAR,
  NOTIF_ERROR_GLOBAL,
  NOTIF_SUCCESS_GLOBAL,
  PROD_DELETE,
  PROD_GET_PAGINATE,
  USER_AUTH,
  USER_EDIT_EMAIL,
  USER_EDIT_PROFILE,
  USER_SIGN_OUT,
} from "../types";

export const userAuthenticate = (user) => ({
  type: USER_AUTH,
  payload: user,
});

export const errorGlobal = (msg) => ({
  type: NOTIF_ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: NOTIF_SUCCESS_GLOBAL,
  payload: msg,
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
