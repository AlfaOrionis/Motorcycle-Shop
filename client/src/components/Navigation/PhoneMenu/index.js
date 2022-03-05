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
        <Link to="/">Wszystkie produkty</Link>
      </li>
      <li>
        <Link to="/">Ubrania </Link>
      </li>
      <li>
        <Link to="/">Akcesoria</Link>
      </li>
    </div>
  );
};

export default PhoneMenu;
