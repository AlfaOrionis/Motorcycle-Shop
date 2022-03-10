import styles from "./PhoneMenu.module.css";
import { Link } from "react-router-dom";
const PhoneMenu = (props) => {
  return (
    <div
      className={`${styles.phoneCategories}  ${
        props.showPhoneMenu ? styles.active : null
      }`}
    >
      <li>
        <Link to="/sklep">Wszystkie produkty</Link>
      </li>
      <li>
        <Link to="/sklep">Ubrania </Link>
      </li>
      <li>
        <Link to="/sklep">Akcesoria</Link>
      </li>
    </div>
  );
};

export default PhoneMenu;
