import * as actions from "./index";
import axios from "axios";
import {
  getTokenCookie,
  removeCookie,
  getAuthHeader,
} from "../../utills/tolls";

import cookie from "react-cookies";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const userRegister = (values) => {
  return async (dispatch) => {
    try {
      console.log("okoko");
      const user = await axios.post("/api/auth/register", {
        email: values.email,
        password: values.password,
      });

      dispatch(
        actions.userAuthenticate({
          data: user.data.user,
          auth: true,
        })
      );
      dispatch(
        actions.successGlobal("Sprawdź swój email aby zweryfikować konto")
      );
    } catch (err) {
      console.log(err.response.data.message);
      console.log(err.response.data.msg);
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userSignIn = (values) => {
  return async (dispatch) => {
    try {
      console.log("SigningIn");
      const user = await axios.post("/api/auth/signin", {
        email: values.email,
        password: values.password,
      });

      dispatch(
        actions.userAuthenticate({
          data: user.data.user,
          auth: true,
        })
      );
      dispatch(actions.successGlobal("Witaj ponownie"));
    } catch (err) {
      console.log(err.response);
      console.log(err.response.data.message);

      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userSignOut = () => {
  return async (dispatch) => {
    removeCookie();
    dispatch(actions.signOut());
    dispatch(actions.successGlobal("Wracaj szybko!"));
  };
};

export const userIsAuth = () => {
  return async (dispatch) => {
    try {
      const user = await axios.get("/api/auth/isauth", getAuthHeader());
      console.log(user);
      dispatch(
        actions.userAuthenticate({
          data: user.data,
          auth: true,
        })
      );
      return user;
    } catch (err) {
      console.log(err.response);
      dispatch(actions.userAuthenticate({ data: {}, auth: false }));
    }
  };
};

export const editUserProfile = (values) => {
  return async (dispatch) => {
    try {
      const profile = await axios.patch(
        "/api/users/profile",
        {
          newFirstName: values.firstname,
          newLastName: values.lastname,
        },
        getAuthHeader()
      );
      console.log(profile);
      dispatch(actions.updateProfile(profile));
      dispatch(actions.successGlobal("Twój profil został zaktualizowany"));
    } catch (err) {
      console.log(err.response);
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const editUserEmail = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.patch(
        "api/users/email",
        {
          password: values.password,
          newEmail: values.newEmail,
        },
        getAuthHeader()
      );

      dispatch(actions.updateEmail(user));
      dispatch(
        actions.successGlobal("Sprawdź swój email aby zweryfikować konto!")
      );
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userAddToCart = (item, size, type) => {
  return async (dispatch) => {
    try {
      //Check if user choosed the size
      if (size.length < 1) {
        dispatch(actions.errorGlobal("Wybierz rozmiar!"));
        return;
      }
      dispatch(actions.userAddToCart({ item, size }));
      console.log(item);
      //If the user is increasing the amount of product in his cart, i dont want to show toast, it doesnt look good, he can see the changes on the price anyway
      if (type !== "increase") {
        dispatch(
          actions.successGlobal(
            `${item.name.toLowerCase()} został dodany do koszyka `
          )
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userRemoveFromCart = (item, size, type) => {
  return async (dispatch) => {
    try {
      dispatch(actions.userRemoveFromCart({ item, size, type }));
    } catch (err) {
      console.log(err);
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};
