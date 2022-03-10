import styles from "./shop.module.css";
import { Link } from "react-router-dom";
import Loader from "../../utills/Loader";
import { imageCheck, getProperties } from "../../utills/tolls";
import { useEffect } from "react";
import PaginationPage from "./PaginationPage";

const Products = ({ products, onGoToPrev, onGoToNext }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (products && products.docs.length > 0) {
    return (
      <div className={styles.productSContainer}>
        {products.docs.map((prod) => (
          <div key={prod.name} className={styles.productContainer}>
            <Link to={`/sklep/product/${prod._id}`} className={styles.imgWrap}>
              <img src={imageCheck(prod)} />
              <h2>{prod.name}</h2>
            </Link>
            <div className={styles.productDescriptionWRAPPER}>
              <div className={styles.productAttributes}>
                <p>
                  <span>
                    <i className="fa-solid fa-cart-arrow-down"></i> Cena
                  </span>
                  <span>
                    <span
                      style={{
                        color: "rgba(30,30,30)",
                        fontWeight: "400",
                        fontSize: "17px",
                        margin: "0 3px",
                      }}
                    >
                      od:
                    </span>
                    <span>{prod.price + ",00 zł"}</span>
                  </span>
                </p>

                {prod.properties && getProperties(prod.properties)}
              </div>
              <div className={styles.imagesContainer}>
                {prod.images &&
                  prod.images.length > 0 &&
                  prod.images.map((img) => (
                    <Link key={img.url} to="/">
                      <img src={img.url} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <PaginationPage
            bottomPagination={true}
            products={products}
            onGoToPrev={onGoToPrev}
            onGoToNext={onGoToNext}
          />
        </div>
      </div>
    ); //This PaginationPage /\ is below the products, on bottom of the page
  } else if (products) {
    return <h3>Nie ma takiego produktu</h3>;
  } else return <Loader />;
};

export default Products;
