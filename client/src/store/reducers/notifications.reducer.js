import {
  NOTIF_CLEAR,
  NOTIF_ERROR_GLOBAL,
  NOTIF_SUCCESS_GLOBAL,
} from "../types";

export default function notificationsReducer(state = {}, action) {
  switch (action.type) {
    case NOTIF_ERROR_GLOBAL:
      return { ...state, error: true, msg: action.payload };

    case NOTIF_SUCCESS_GLOBAL:
      return {
        ...state,
        success: true,
        msg: action.payload,
        // if i dont pass time here, i have it set on hoc mainLayout
        time: action.time,
      };

    case NOTIF_CLEAR:
      return {};

    default:
      return state;
  }
}
