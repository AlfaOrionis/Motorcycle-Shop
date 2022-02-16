import { Link } from "react-router-dom";
import styles from "./header.module.css";
const TopHeader = (props) => {
  return (
    <nav className={styles.TopHeader}>
      <div className={styles.left}>
        <div className={styles.input}>
          <Link style={{ textDecoration: "none" }} to="/">
            <h1> MotorcycleShop</h1>
          </Link>
          <input placeholder="Czego szukasz?" />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <span onClick={props.onOpenAuth}>
          <i class="fa-solid fa-user"></i>
        </span>
        <Link to="/dashboard/user/user_cart">
          <i className="fa-solid fa-cart-shopping"></i>
        </Link>
      </div>
    </nav>
  );
};

export default TopHeader;
