import styles from "./shop.module.css";
import * as img from "../../Images/Clothes/Clothes";
import { Link } from "react-router-dom";
import Loader from "../../utills/Loader";
import { imageCheck, getProperties } from "../../utills/tolls";

const Products = ({ products }) => {
  if (products && products.docs.length > 0) {
    return (
      <div className={styles.productSContainer}>
        {products.docs.map((prod) => (
          <div key={prod.name} className={styles.productContainer}>
            <div className={styles.imgWrap}>
              <img src={imageCheck(prod)} />
              <h2>{prod.name}</h2>
            </div>
            <div className={styles.productDescriptionWRAPPER}>
              <div className={styles.productAttributes}>
                <p>
                  <span>
                    <i className="fa-solid fa-cart-arrow-down"></i> Cena
                  </span>
                  <span>
                    od: <span>{prod.price + ",00"}</span>
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
      </div>
    );
  } else return <Loader />;
};

export default Products;
