import * as img from "../../Images/Clothes/Clothes";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className={styles.categoryWrapper}>
      <Link to={"/sklep?categories=6216160087b585df4240a5ec"}>
        <img src={img.Helmets} alt="Kaski" />
        <span>Kaski</span>
      </Link>
      <Link to={"/sklep?categories=621615ec87b585df4240a5dc"}>
        <img src={img.Jackets} alt="Kurtki" />
        <span>Kurtki</span>
      </Link>
      <Link to={"/sklep?categories=621615fd87b585df4240a5e8"}>
        <img src={img.Gloves} alt="Rękawice" />
        <span>Rękawice</span>
      </Link>
      <Link to={"/sklep?categories=621615f987b585df4240a5e4"}>
        <img src={img.Shoes} alt="Buty" />
        <span>Buty</span>
      </Link>
      <Link to={"/sklep?categories=621615f487b585df4240a5e0"}>
        <img src={img.Pants} alt="Spodnie" />
        <span>Spodnie</span>
      </Link>
      <Link to={"/sklep?categories=621f591be042ba3914ba0723"}>
        <img src={img.Suits} alt="Stroje" />
        <span>Stroje</span>
      </Link>
    </div>
  );
};

export default Categories;
