import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useReducer } from "react";
import { productsByPaginate } from "../../store/actions/product.actions";
import ProductsTable from "./ProductsTable";
import styles from "./admin.module.css";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import RemoveProduct from "./RemoveProduct";

const defaultValues = {
  keywords: "",
  brands: [],
};

//REDUCER CONTROLLING PAGINATING VALUES
const reducer = (state, action) => {
  switch (action.type) {
    case "keywords":
      return { ...state, keywords: action.payload };
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
        };
      } else return { ...state, brands: [...state.brands, action.payload] };
    case "nextPage": {
      return { ...state, page: state.page + 1 };
    }
    case "prevPage": {
      return { ...state, page: state.page - 1 };
    }
  }
};

const AdminProducts = () => {
  // STATES
  const [brands, setBrands] = useState(null);
  const [state, reducerDispatch] = useReducer(reducer, defaultValues);
  const [prodToRemove, setProdToRemove] = useState(null);

  // REDUX
  const products = useSelector((state) => state.products.byPaginate);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  //USE EFFECT
  useEffect(async () => {
    const brands = await axios.get("/api/brands/all");
    setBrands(brands.data);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(productsByPaginate(state));
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  useEffect(() => {
    // so if the product has been removed succesfullly, i wanna clear the state and this will also automatically close the modal
    if (notifications && notifications.success) {
      clearProdToRemove();
      // i dispatch again to update the list of products, otherwise the removed product would still be there
      dispatch(productsByPaginate(state));
    }
  }, [notifications]);

  // FUNCTIONS

  const goToNext = () => {
    reducerDispatch({ type: "nextPage" });
  };

  const goToPrev = () => {
    reducerDispatch({ type: "prevPage" });
  };

  const getProdToRemove = (id) => {
    setProdToRemove(id);
  };

  const clearProdToRemove = () => {
    setProdToRemove(null);
  };

  return (
    <div className={styles.mainContainer}>
      <input
        placeholder="Wyszukaj produkt"
        onChange={(e) => {
          console.log(state);
          reducerDispatch({ type: "keywords", payload: e.target.value });
        }}
      />
      <div className={styles.allBrands}>
        {brands &&
          brands.length > 0 &&
          brands.map((brand) => (
            <div>
              <label htmlFor={brand.name}>{brand.name}</label>
              <input
                onChange={() => {
                  reducerDispatch({ type: "brand", payload: brand._id });
                }}
                type="checkbox"
                id={brand.name}
              />
            </div>
          ))}
      </div>
      <Pagination>
        {products && products.hasPrevPage && (
          <>
            <Pagination.Prev onClick={goToPrev} />
            <Pagination.Item onClick={goToPrev}>
              {products.prevPage}
            </Pagination.Item>
          </>
        )}
        <Pagination.Item active>{products && products.page}</Pagination.Item>
        {products && products.hasNextPage && (
          <>
            <Pagination.Item onClick={goToNext}>
              {products.nextPage}
            </Pagination.Item>
            <Pagination.Next onClick={goToNext} />
          </>
        )}
      </Pagination>

      <ProductsTable prods={products} onGetToRemove={getProdToRemove} />
      {/* \/PRODUCT ACTIONS (DELETE AND EDIT) \/ */}

      <RemoveProduct
        onClearProdToRemove={clearProdToRemove}
        onProdToRemove={prodToRemove}
      />
    </div>
  );
};

export default AdminProducts;
