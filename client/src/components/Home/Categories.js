import * as img from "../../Images/Clothes/Clothes";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className={styles.categoryWrapper}>
      <Link to={"/sklep"}>
        <img src={img.Helmets} alt="Kaski" />
        <span>Kaski</span>
      </Link>
      <Link to={"/sklep"}>
        <img src={img.Jackets} alt="Kurtki" />
        <span>Kurtki</span>
      </Link>
      <Link to={"/sklep"}>
        <img src={img.Gloves} alt="Rękawice" />
        <span>Rękawice</span>
      </Link>
      <Link to={"/sklep"}>
        <img src={img.Shoes} alt="Buty" />
        <span>Buty</span>
      </Link>
      <Link to={"/sklep"}>
        <img src={img.Pants} alt="Spodnie" />
        <span>Spodnie</span>
      </Link>
      <Link to={"/sklep"}>
        <img src={img.Suits} alt="Stroje" />
        <span>Stroje</span>
      </Link>
    </div>
  );
};

export default Categories;
