import styles from "./Cart.module.css";

const CartBtn = ({ onHandleShow }) => {
  return (
    <button onClick={() => onHandleShow(true)} className={styles.cartBtn}>
      <span>3</span>
      <i className="fa-solid fa-cart-shopping"></i>
    </button>
  );
};

export default CartBtn;
