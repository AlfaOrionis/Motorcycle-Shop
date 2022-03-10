import styles from "./Cart.module.css";
import { useLocation } from "react-router-dom";
const CartBtn = ({ onHandleShow, cart }) => {
  //If the user enters the /koszyk page, i dont want to show the cartBtn anymore, its pointless
  const location = useLocation();

  let amountOfItems = 0;
  cart.cart.forEach((item) => {
    amountOfItems = amountOfItems + item.quantity;
  });

  return (
    <button
      style={location.pathname === "/koszyk" ? { display: "none" } : null}
      onClick={() => onHandleShow(true)}
      className={styles.cartBtn}
    >
      <span>{amountOfItems} </span>
      <i className="fa-solid fa-cart-shopping"></i>
    </button>
  );
};

export default CartBtn;
