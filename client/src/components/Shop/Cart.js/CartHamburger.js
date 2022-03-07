import { useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../../../hoc/Modal";
import { useDispatch, useSelector } from "react-redux";
import { imageCheck } from "../../../utills/tolls";
import cookie from "react-cookies";
import {
  userAddToCart,
  userRemoveFromCart,
} from "../../../store/actions/users.actions";
import { Link } from "react-router-dom";
const CartHamburger = ({ show, onHandleShow }) => {
  const cart = useSelector((state) => state.users.cart);
  const dispatch = useDispatch();
  const cartItems = cart.cart;

  const [showShipping, setShowShipping] = useState(false);

  const increaseQuantityHandler = (item, size, type) => {
    dispatch(userAddToCart(item, size, type));
  };

  //type will tell if we wanna decrease quantity or completly remove
  const decreaseQuantityHandler = (item, size, type) => {
    dispatch(userRemoveFromCart(item, size, type));
  };
  //I will try to store the cart in a cookie, so it does not dissapear even if u refresh the page, its definitly a new thing for me

  return (
    <Modal onCloseModal={() => onHandleShow(false)} show={show}>
      <div className={`${styles.cartHamburger} ${show ? styles.active : ""}`}>
        <header>
          <button onClick={() => onHandleShow(false)}>
            <i className="fa-solid fa-angle-left " />
          </button>
          <h1>Koszyk</h1>
          <span></span>
        </header>
        {cartItems && cartItems.length > 0 && (
          <>
            <main id="cart_main">
              <ul>
                {cartItems.map((cartItem) => (
                  <li key={`${cartItem.item._id} ${cartItem.size}`}>
                    <div className={styles.imgWrapper}>
                      <img
                        src={imageCheck(cartItem.item)}
                        alt={cartItem.name}
                      />
                    </div>
                    <div className={styles.infoWrapper}>
                      <div>
                        <Link
                          onClick={() => onHandleShow(false)}
                          to={`/sklep/product/${cartItem.item._id}`}
                        >
                          <p>{cartItem.item.name}</p>
                        </Link>
                        <button
                          onClick={() =>
                            decreaseQuantityHandler(
                              cartItem.item,
                              cartItem.size,
                              "remove"
                            )
                          }
                        >
                          <i className="fa-solid fa-circle-minus"></i>
                        </button>
                      </div>
                      <div>
                        <span>Rozmiar : {cartItem.size}</span>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            decreaseQuantityHandler(
                              cartItem.item,
                              cartItem.size,
                              "decrease"
                            )
                          }
                        >
                          -
                        </button>
                        <span>ile: {cartItem.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantityHandler(
                              cartItem.item,
                              cartItem.size,
                              "increase"
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <p>{cartItem.totalPrice + ",00 zł"}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </main>

            <footer>
              <div className={styles.shippingDiv}>
                <button onClick={() => setShowShipping((prev) => !prev)}>
                  Metody dostawy
                </button>
                {
                  <div
                    className={`${styles.shippingOptions} ${
                      showShipping ? styles.active : ""
                    }`}
                  >
                    <ul>
                      <li>
                        <span>Kurier</span> <span>15,00 zł</span>
                      </li>
                      <li>
                        <span>Kurier za pobraniem</span> <span>15,00 zł</span>
                      </li>
                      <li>
                        <span>Odbiór osobity</span> <span>0,00 zł</span>
                      </li>
                      <li>
                        <span>Paczkomat inPost</span> <span>12,00 zł</span>
                      </li>
                    </ul>
                  </div>
                }
              </div>
              <div className={styles.priceDiv}>
                <div>
                  <p>W sumie</p> <span>{cart.cartPrice + ",00 zł"}</span>
                </div>
                <div>
                  <p>Z dostawą</p>{" "}
                  <span>
                    {cart.cartPrice <= 499
                      ? cart.cartPrice + 15 + ",00 zł"
                      : cart.cartPrice + ",00 zł"}
                  </span>
                </div>
              </div>
              <button className={styles.submitBtn}>Dalej</button>
            </footer>
          </>
        )}
        {!cartItems ||
          (cartItems.length < 1 && (
            <div className={styles.emptyCart}>
              <p>Twój koszyk jest pusty</p>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default CartHamburger;
