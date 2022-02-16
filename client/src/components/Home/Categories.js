import * as img from "../../Clothes/Clothes";
import styles from "./home.module.css";

const Categories = () => {
  return (
    <div className={styles.categoryWrapper}>
      <div>
        <img src={img.Helmets} alt="Kaski" />
        <span>Kaski</span>
      </div>
      <div>
        <img src={img.Jackets} alt="Kurtki" />
        <span>Kurtki</span>
      </div>
      <div>
        <img src={img.Gloves} alt="Rękawice" />
        <span>Rękawice</span>
      </div>
      <div>
        <img src={img.Shoes} alt="Buty" />
        <span>Buty</span>
      </div>
      <div>
        <img src={img.Pants} alt="Spodnie" />
        <span>Spodnie</span>
      </div>
      <div>
        <img src={img.Suits} alt="Stroje" />
        <span>Stroje</span>
      </div>
    </div>
  );
};

export default Categories;
