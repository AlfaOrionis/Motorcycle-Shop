import {
  USER_AUTH,
  USER_EDIT_EMAIL,
  USER_EDIT_PROFILE,
  USER_SIGN_OUT,
} from "../types";

const DEFAULT_USER_STATE = {
  data: {
    _id: null,
    firstname: null,
    lastname: null,
    email: null,
    favourites: null,
    history: [],
    verified: null,
  },
  auth: null,
  cart: [],
};

export default function usersReducer(state = DEFAULT_USER_STATE, action) {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        auth: action.payload.auth,
      };

    case USER_SIGN_OUT:
      return { ...state, data: { ...DEFAULT_USER_STATE.data }, auth: false };

    case USER_EDIT_PROFILE:
      return {
        ...state,
        data: {
          ...state.data,
          firstname: action.payload.data.user.firstname,
          lastname: action.payload.data.user.lastname,
        },
      };

    case USER_EDIT_EMAIL:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data.user },
      };

    default:
      return state;
  }
}
