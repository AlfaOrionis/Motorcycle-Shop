import styles from "./shop.module.css";
import PaginationCard from "./PaginationCard";
import PaginationFilterCard from "./PaginationFilterCard";
import Products from "./Products";
import { getCategories } from "../../store/actions/categories.actions";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../store/actions/brands.actions";
import { productsByPaginate } from "../../store/actions/products.actions";
import { useSearchParams } from "react-router-dom";

//REDUCER CONTROLLING PAGINATING VALUES
const reducer = (state, action) => {
  switch (action.type) {
    case "keywords":
      return { ...state, keywords: action.payload, page: 1 };

    case "checkboxValue":
      //Its pretty much the same function for brands categories and sizes, so i kinda made universal one
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
          return {
            ...state,
            brands: [...state.brands, action.payload],
            page: 1,
          };
        } else if (action.value === "category") {
          return {
            ...state,
            categories: [...state.categories, action.payload],
            page: 1,
          };
        } else if (action.value === "size") {
          return { ...state, size: [...state.size, action.payload], page: 1 };
        }
      }
    case "minimum": {
      return { ...state, min: action.payload, page: 1 };
    }
    case "maximum": {
      return { ...state, max: action.payload, page: 1 };
    }
    case "nextPage": {
      return { ...state, page: state.page + 1 };
    }
    case "prevPage": {
      return { ...state, page: state.page - 1 };
    }
    case "limit": {
      return { ...state, limit: action.payload, page: 1 };
    }
    case "sortByPrice": {
      return {
        ...state,
        sortBy: "price",
        order: action.payload,
        page: 1,
      };
    }
    case "sortByDate": {
      return { ...state, sortBy: "date", order: action.payload, page: 1 };
    }
    case "sortByItemSold": {
      return { ...state, sortBy: "itemSold", order: action.payload, page: 1 };
    }

    default:
      return state;
  }
};

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const defaultValues = {
    page: 1,
    keywords: "",
    brands: [],
    categories:
      params.get("categories") && params.get("categories").length > 0
        ? [params.get("categories")]
        : [],
    size: [],
    min: 0,
    max: 99999,
    sortBy:
      params.get("sortBy") && params.get("sortBy").length > 0
        ? params.get("sortBy")
        : "date",
    order: "desc",
    limit: 10,
  };

  const dispatch = useDispatch();

  //USE SELECTOR
  const categories = useSelector((state) => state.categories.allCategories);
  const products = useSelector((state) => state.products.byPaginate);
  const brands = useSelector((state) => state.brands.allBrands);

  //STATE
  const [state, reducerDispatch] = useReducer(reducer, defaultValues);

  //USE EFFECT
  useEffect(() => {
    document.title = "Produkty";
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(productsByPaginate(state));
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [state, dispatch]);

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
  const HandleMinimum = (value) => {
    reducerDispatch({ type: "minimum", payload: value });
  };

  const HandleMaximum = (value) => {
    console.log(value);
    reducerDispatch({ type: "maximum", payload: value });
  };
  const handleSortByItemSold = (value) => {
    reducerDispatch({ type: "sortByItemSold", payload: value });
  };
  const handleSortByPrice = (value) => {
    reducerDispatch({ type: "sortByPrice", payload: value });
  };
  const handleSortByDate = (value) => {
    reducerDispatch({ type: "sortByDate", payload: value });
  };
  const handleLimit = (value) => {
    reducerDispatch({ type: "limit", payload: value });
  };

  return (
    <>
      <PaginationCard
        sortByState={state.sortBy}
        orderState={state.order}
        limitState={state.limit}
        products={products}
        onGoToPrev={goToPrev}
        onGoToNext={goToNext}
        onkeywordsHandler={keywordsHandler}
        onHandleSortByPrice={handleSortByPrice}
        onHandleSortByDate={handleSortByDate}
        onHandleLimit={handleLimit}
        onHandleSortByItemSold={handleSortByItemSold}
        //At this point, i have to pass the same data to PaginationCard as to the PaginationFilterCard below, because in the PaginationCard i will also display PaginationFilterCard for the phone version (<1024px) so its like PaginationCard has also whole PaginationFilterCard withIn
        categoriesState={state.categories}
        brandsState={state.brands}
        sizeState={state.size}
        categories={categories}
        brands={brands}
        onHandleMinimum={HandleMinimum}
        onHandleMaximum={HandleMaximum}
        onSizeHandler={SizeHandler}
        oncategoryHandler={categoryHandler}
        onBrandHandler={brandHandler}
      />
      <div className={styles.shopContainer}>
        <PaginationFilterCard
          categories={categories}
          brands={brands}
          categoriesState={state.categories}
          brandsState={state.brands}
          sizeState={state.size}
          onHandleMinimum={HandleMinimum}
          onHandleMaximum={HandleMaximum}
          onSizeHandler={SizeHandler}
          oncategoryHandler={categoryHandler}
          onBrandHandler={brandHandler}
        />
        <Products
          onGoToPrev={goToPrev}
          onGoToNext={goToNext}
          products={products}
        />
      </div>
    </>
  );
};

export default Shop;
