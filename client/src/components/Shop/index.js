import styles from "./shop.module.css";
import PaginationCard from "./PaginationCard";
import PaginationFilterCard from "./PaginationFilterCard";
import Products from "./Products";
import { getCategories } from "../../store/actions/categories.actions";
import { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../store/actions/brands.actions";
import { productsByPaginate } from "../../store/actions/products.actions";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

const defaultValues = {
  page: 1,
  keywords: "",
  brands: [],
  categories: [],
  size: [],
  min: "",
  max: "",
  sortBy: "",
};

//REDUCER CONTROLLING PAGINATING VALUES
const reducer = (state, action) => {
  switch (action.type) {
    case "keywords":
      return { ...state, keywords: action.payload };

    case "checkboxValue":
      let paginateValues =
        (action.value === "brand" && [...state.brands]) ||
        (action.value === "category" && [...state.categories]) ||
        (action.value === "size" && [...state.size]);

      const existingValueIndex = paginateValues.findIndex(
        (val) => val === action.payload
      );
      if (existingValueIndex >= 0) {
        paginateValues.splice(existingValueIndex, 1);
        if (action.value === "brand") {
          return { ...state, brands: paginateValues };
        } else if (action.value === "category") {
          return { ...state, categories: paginateValues };
        } else if (action.value === "size") {
          return { ...state, size: paginateValues };
        }
      } else {
        if (action.value === "brand") {
          return { ...state, brands: [...state.brands, action.payload] };
        } else if (action.value === "category") {
          return {
            ...state,
            categories: [...state.categories, action.payload],
          };
        } else if (action.value === "size") {
          return { ...state, size: [...state.size, action.payload] };
        }
      }
    case "nextPage": {
      return { ...state, page: state.page + 1 };
    }
    case "prevPage": {
      return { ...state, page: state.page - 1 };
    }
    default:
      return defaultValues;
  }
};

const Shop = () => {
  const categories = useSelector((state) => state.categories.allCategories);
  const products = useSelector((state) => state.products.byPaginate);
  const notifications = useSelector((state) => state.notifications);
  const brands = useSelector((state) => state.brands.allBrands);

  const dispatch = useDispatch();

  //STATE
  const [state, reducerDispatch] = useReducer(reducer, defaultValues);

  //USE EFFECT
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(productsByPaginate(state));
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  //PAGINATE
  const goToNext = () => {
    reducerDispatch({ type: "nextPage" });
  };
  const goToPrev = () => {
    reducerDispatch({ type: "prevPage" });
  };
  const keywordsHandler = (value) => {
    reducerDispatch({ type: "keywords", payload: value });
  };
  const brandHandler = (id) => {
    reducerDispatch({ type: "checkboxValue", value: "brand", payload: id });
  };
  const categoryHandler = (id) => {
    reducerDispatch({ type: "checkboxValue", value: "category", payload: id });
  };
  const SizeHandler = (size) => {
    reducerDispatch({ type: "checkboxValue", value: "size", payload: size });
  };

  return (
    <>
      <PaginationCard onkeywordsHandler={keywordsHandler} />
      <div className={styles.shopContainer}>
        <PaginationFilterCard
          onSizeHandler={SizeHandler}
          oncategoryHandler={categoryHandler}
          onBrandHandler={brandHandler}
          categories={categories}
          brands={brands}
        />
        <Products products={products} />
      </div>
    </>
  );
};

export default Shop;

// case "category":
//   let categories = [...state.categories];
//   const existingCategoryIndex = categories.findIndex(
//     (cat) => cat === action.payload
//   );
//   if (existingCategoryIndex >= 0) {
//     categories.splice(existingCategoryIndex, 1);
//     return {
//       ...state,
//       categories: categories,
//     };
//   } else
//     return { ...state, categories: [...state.categories, action.payload] };
