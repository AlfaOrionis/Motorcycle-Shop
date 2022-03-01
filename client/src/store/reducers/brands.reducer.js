import { BRAND_GET_ALL } from "../types";

export default function brandsReducer(state = {}, action) {
  switch (action.type) {
    case BRAND_GET_ALL:
      return { ...state, allBrands: action.payload };

    default:
      return state;
  }
}
