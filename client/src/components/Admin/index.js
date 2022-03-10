import styles from "./admin.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useReducer } from "react";
import { productsByPaginate } from "../../store/actions/products.actions";
import ProductsTable from "./ProductsTable";
import RemoveProduct from "./RemoveProduct";
import ProductsPagination from "./ProductsPagination";
import { getBrands } from "../../store/actions/brands.actions";
import Loader from "../../utills/Loader";

const defaultValues = {
  page: 1,
  keywords: "",
  brands: [],
};
//REDUCER CONTROLLING PAGINATING VALUES
const reducer = (state, action) => {
  switch (action.type) {
    case "keywords":
      return { ...state, keywords: action.payload, page: 1 };
    case "brand":
      let brands = [...state.brands];
      const existingBrandIndex = brands.findIndex(
        (brand) => brand === action.payload
      );
      if (existingBrandIndex >= 0) {
        brands.splice(existingBrandIndex, 1);
        return {
          ...state,
          brands: brands,
          page: 1,
        };
      } else
        return { ...state, brands: [...state.brands, action.payload], page: 1 };
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

const AdminProducts = () => {
  const notifications = useSelector((state) => state.notifications);
  const products = useSelector((state) => state.products.byPaginate);
  const brands = useSelector((state) => state.brands.allBrands);
  const dispatch = useDispatch();

  //STATE
  const [state, reducerDispatch] = useReducer(reducer, defaultValues);
  const [prodToRemove, setProdToRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //USE EFFECT

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(productsByPaginate(state));
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [state, dispatch]);
  useEffect(() => {
    setIsLoading(false);
    // so if the product has been removed succesfullly, i wanna clear the state close the modal
    if (notifications && notifications.success) {
      clearProdToRemove();
      // i dispatch again to update the list of products, otherwise the removed product would still be there
      dispatch(productsByPaginate(state));
    }
  }, [notifications, dispatch, state]);

  const setLoading = () => {
    setIsLoading(true);
  };

  //PAGINATE
  const goToNext = () => {
    reducerDispatch({ type: "nextPage" });
  };
  const goToPrev = () => {
    reducerDispatch({ type: "prevPage" });
  };
  const keywordsHandler = (value) => {
    console.log(state);
    reducerDispatch({ type: "keywords", payload: value });
  };
  const brandHandler = (id) => {
    reducerDispatch({ type: "brand", payload: id });
  };

  //REMOVE
  const getProdToRemove = (id) => {
    setProdToRemove(id);
  };
  const clearProdToRemove = () => {
    setProdToRemove(null);
  };

  return (
    <div className={styles.mainContainer}>
      {isLoading && <Loader side />}
      <ProductsPagination
        onKeywordsHandler={keywordsHandler}
        onBrandHandler={brandHandler}
        onClearProdToRemove={clearProdToRemove}
        onGoToPrev={goToPrev}
        onGoToNext={goToNext}
        products={products}
        brands={brands}
      />
      <ProductsTable prods={products} onGetToRemove={getProdToRemove} />
      <RemoveProduct
        onClearProdToRemove={clearProdToRemove}
        onProdToRemove={prodToRemove}
        onSetIsLoading={setLoading}
      />
    </div>
  );
};

export default AdminProducts;
