import { PROD_DELETE, PROD_GET_PAGINATE } from "../types";

export default function productsReducer(state = {}, action) {
  switch (action.type) {
    case PROD_GET_PAGINATE:
      return { ...state, byPaginate: action.payload };

    default:
      return state;
  }
}
