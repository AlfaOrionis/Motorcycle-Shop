import * as actions from "./index";
import axios from "axios";
import { removeCookie, getAuthHeader } from "../../utills/tolls";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const userRegister = (values) => {
  return async (dispatch) => {
    try {
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
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userSignIn = (values) => {
  return async (dispatch) => {
    try {
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
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userSignInGoogle = (access_token) => {
  console.log(access_token);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        }
      );
      const user = await axios.post("/api/auth/signInGoogle", {
        email: response.data.email,
        firstname: response.data.given_name,
        lastname: response.data.family_name,
      });

      dispatch(
        actions.userAuthenticate({
          data: user.data.user,
          auth: true,
        })
      );
      dispatch(actions.successGlobal("Witaj!"));
    } catch (err) {
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
      dispatch(
        actions.userAuthenticate({
          data: user.data,
          auth: true,
        })
      );
      return user;
    } catch (err) {
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
      dispatch(actions.updateProfile(profile));
      dispatch(actions.successGlobal("Twój profil został zaktualizowany"));
    } catch (err) {
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

      //If the user is increasing the amount of product in his cart, i dont want to show toast, it doesnt look good, he can see the changes on the price anyway
      if (type !== "increase") {
        dispatch(
          actions.successGlobal(
            `${item.name.toLowerCase()} został dodany do koszyka `
          )
        );
      }
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userRemoveFromCart = (item, size, type) => {
  return async (dispatch) => {
    try {
      dispatch(actions.userRemoveFromCart({ item, size, type }));
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userCreateOrder = (values) => {
  return async (dispatch) => {
    try {
      await axios.post(
        "/api/order/order",
        {
          recipientInfo: values.recipientInfo,
          VAT_DATA: values.VAT_DATA,
          orderPrice: values.orderPrice,
          cart: values.cart,
          shipping: values.shipping,
          shippingInfo: values.shippingInfo,
          ppData: values.ppData,
        },
        getAuthHeader()
      );

      //After creating an order i want to clear user cart
      dispatch(actions.userClearCart());
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userOrderHistory = () => {
  return async (dispatch) => {
    try {
      const OrderHistory = await axios.get("/api/order/order", getAuthHeader());
      dispatch(actions.userOrderHistory(OrderHistory.data));
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};
