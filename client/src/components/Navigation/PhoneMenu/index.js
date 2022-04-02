import styles from "./PhoneMenu.module.css";
import { Link } from "react-router-dom";
const PhoneMenu = (props) => {
  const closeMenuHandler = () => {
    props.openPhoneMenu();
  };

  return (
    <div
      className={`${styles.phoneCategories}  ${
        props.showPhoneMenu ? styles.active : null
      }`}
    >
      <li>
        <Link onClick={closeMenuHandler} to="/sklep">
          Wszystkie produkty
        </Link>
      </li>
      <li>
        <Link onClick={closeMenuHandler} to="/sklep">
          Ubrania
        </Link>
      </li>
      <li>
        <Link onClick={closeMenuHandler} to="/sklep">
          Akcesoria
        </Link>
      </li>
    </div>
  );
};

export default PhoneMenu;
