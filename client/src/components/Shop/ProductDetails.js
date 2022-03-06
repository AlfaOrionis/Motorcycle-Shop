import styles from "./ProductDetails.module.css";

import classes from "./shop.module.css";
import payPoImg from "../../Images/paypo.jpg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProperties } from "../../utills/tolls";
import { showMenu } from "../../utills/MenuOnScroll";
import Description from "./Description";
import SizeChart from "./SizeChart";
import { userAddToCart } from "../../store/actions/users.actions";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  //STATE
  const [product, setProduct] = useState("");
  const [imgToShow, setImgToShow] = useState("");
  const [sizeValue, setSizeValue] = useState("");

  //USE EFFECT

  useEffect(() => {
    window.scrollTo(0, 0);
    // FECTHING THE PRODUCT TO DISPLAY
    fetch(`/api/products/product/${params.id}`)
      .then((res) => res.json())
      .then((prod) => {
        setProduct(prod);
      });

    // MENU ON SCROLL FUNCTION (ONLY ON 1280px and higher resolution)
    let MenuOnScroll;
    if (window.innerWidth > 1279) {
      //Fetching components needed for calculations
      const newsLetter = document.getElementById("newsLetter");
      const buySection = document.getElementById("buySection");
      const shoppingColumn = document.getElementById("shoppingColumn");
      //Passing components to the function
      MenuOnScroll = () => {
        showMenu(buySection, shoppingColumn, newsLetter);
      };

      window.addEventListener("scroll", MenuOnScroll);
    }

    //REMOVING THE LISTENER WHEN COMPONENT UNMOUNTS
    return () => window.removeEventListener("scroll", MenuOnScroll);
  }, [params.id]);

  //ACTION
  const AddToCartHandler = () => {
    dispatch(userAddToCart(product, sizeValue));
  };

  const sizes = ["S", "M", "L", "XL", "XXL"];
  return (
    <>
      <div className={styles.buyContainer}>
        <div id="buySection" className={styles.buySection}>
          <div>
            <ul>
              <li>
                <Link to="/">Strona główna</Link>
                <i className="fa-solid fa-angles-right"></i>
              </li>
              <li>
                <Link to="/sklep">Sklep</Link>
                <i className="fa-solid fa-angles-right"></i>
              </li>
              <li>
                <Link
                  to={`/sklep?categories=${product && product.category._id}`}
                >
                  {product && product.category.name}
                </Link>
                <i className="fa-solid fa-angles-right"></i>
              </li>
            </ul>

            <h2>{product && product.name}</h2>
          </div>

          <div>
            <div className={styles.imgWrapper}>
              <img
                src={
                  (imgToShow && imgToShow) || (product && product.images[0].url)
                }
              />
            </div>

            <div id="shoppingColumn" className={styles.shoppingColumn}>
              <div className={styles.smallImages}>
                <span>Wersja: </span>
                <div>
                  {product &&
                    product.images.map((img) => (
                      <img
                        key={img.publicId}
                        src={img.url}
                        onClick={(e) => setImgToShow(e.target.src)}
                        className={
                          (imgToShow === img.url
                            ? `${styles.activeIMG}`
                            : "") ||
                          (!imgToShow && product.images[0].url === img.url
                            ? `${styles.activeIMG}`
                            : "")
                        }
                      />
                    ))}
                </div>
              </div>

              <div className={styles.sizes}>
                <p>
                  Rozmiar: <span>{sizeValue}</span>
                </p>

                <div>
                  {sizes.map((size) => (
                    <button
                      className={sizeValue === size ? `${styles.active}` : ""}
                      style={
                        product && product.size[size.toLowerCase()] === 0
                          ? { opacity: "0.3" }
                          : null
                      }
                      disabled={
                        product && product.size[size.toLowerCase()] === 0
                      }
                      key={size}
                      onClick={() => setSizeValue(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.price}>
                <p>
                  Cena: <span>{product && product.price + ",00 zł"}</span>
                </p>
              </div>

              <div className={styles.shipping}>
                <div>
                  <div>
                    <i className="fa-solid fa-truck" />
                    <p>Planowana wysyłka: 24h</p>
                  </div>
                  {product.shipping ? (
                    <p>
                      Darmowa dostawa
                      <i
                        style={{ fontSize: "18px", color: "rgba(44,88,166)" }}
                        className="fa-solid fa-thumbs-up"
                      ></i>
                    </p>
                  ) : (
                    <p>Dostawa od: 15zł</p>
                  )}
                </div>
                <button onClick={AddToCartHandler}>Dodaj do koszyka</button>
                <Link to="/zaplac-za-30-dni">
                  <img src={payPoImg} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div>
            <div>
              <i className="fa-solid fa-truck" />
            </div>

            <Link to="/">
              92% WYSYŁEK W <strong>24H</strong>
              <p>
                Zrobimy wszystko, aby Twoje zakupy dotarły błyskawicznie i
                bezproblemowo! Więcej o czasach dostawy
              </p>
            </Link>
          </div>
          <div>
            <div>
              <i className="fa-solid fa-recycle"></i>
            </div>
            <Link to="/">
              <strong>30</strong> DNI NA ZWROT
              <p>
                Masz cały miesiąc na zwrot lub wymianę towaru na inny Zły
                rozmiar? Wymienimy!
              </p>
            </Link>
          </div>
          <div>
            <div>
              <i className="fa-solid fa-basket-shopping"></i>
            </div>
            <span>GRATISY</span>
            <p>
              Do każdego zamówienia dorzucamy coś ekstra! Darmowa dostawa
              powyżej 500 zł!
            </p>
          </div>
          <div>
            <div>
              <i className="fa-solid fa-clipboard-check"></i>
            </div>
            <Link to="/">
              GWARANCJA
              <p>
                Każdy produkt obejmuje 24 miesięczna gwarancja! A większość
                nawet 5 letnia!
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.secondContainer}>
        <Description
          title={product && product.name}
          description={product && product.description}
        />

        <div className={styles.productAttributes}>
          <div className={classes.productAttributes}>
            <h3>Dane techniczne</h3>
            {product.properties && getProperties(product.properties)}
          </div>
        </div>

        <Description
          title={`Informacje o producencie - ${product && product.brand.name}`}
          description={product && product.brand && product.brand.description}
        />

        <SizeChart cat_name={product && product.category.name} />
      </div>
    </>
  );
};

export default ProductDetails;
