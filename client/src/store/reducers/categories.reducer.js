import { CATG_GET_ALL } from "../types";

export default function categoriesReducer(state = {}, action) {
  switch (action.type) {
    case CATG_GET_ALL:
      return { ...state, allCategories: action.payload };

    default:
      return state;
  }
}
