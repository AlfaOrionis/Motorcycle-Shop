import { Link } from "react-router-dom";
import styles from "./menuOnHover.module.css";
import * as img from "../../../Images/Clothes/Clothes";

const HoverMenu = ({ category, open, close }) => {
  const clothes = [
    { name: "Rękawice", img: img.Gloves },
    { name: "Kaski", img: img.Helmets },
    { name: "Spodnie", img: img.Pants },
    { name: "Stroje", img: img.Suits },
    { name: "Buty", img: img.Shoes },
    { name: "Kurtki", img: img.Jackets },
    { name: "Ochraniacze", img: img.Protectors },
    { name: "Kominiarki", img: img.Balaclavas },
  ];

  const accesories = [
    { name: "Chemia motocyklowa", img: img.MotorcycleCosmetics },
    { name: "Oleje", img: img.Oils },
    { name: "Bagaż", img: img.Luggage },
    { name: "Pokrowce", img: img.Cases },
    { name: "Zabezpieczenia", img: img.Security },
    { name: "Interkomy", img: img.Intercom },
    { name: "Odzież przeciwdeszczowa", img: img.Rainproof },
    { name: "Uchwyty na telefon", img: img.PhoneHolder },
  ];

  const allProducts = clothes.slice(0, 4).concat(accesories.slice(0, 4));

  const readyToMap =
    (category === "Akcesoria" && accesories) ||
    (category === "Ubrania" && clothes) ||
    (category === "Wszystkie produkty" && allProducts);

  return (
    <div
      onMouseEnter={() => open(category)}
      onMouseLeave={close}
      className={styles.Container}
    >
      <div>
        <h1>{category}</h1>
      </div>

      <ul>
        {readyToMap.map((product) => {
          return (
            <li key={product.name}>
              <Link to="/">
                <img src={product.img} />
                <span>{product.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* <ul>
        <li>
          <Link to="/">
            <img src={img.Gloves} />
            <span>{main === "Wszystkie produkty" && "Rękawice"}</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={img.Helmets} />
            <span>{main === "Wszystkie produkty" && "Kaski"}</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={img.Pants} />
            <span>{main === "Wszystkie produkty" && "Rękawice"}</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={img.Suits} />
            <span>{main === "Wszystkie produkty" && "Rękawice"}</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={img.Shoes} />
            <span>{main === "Wszystkie produkty" && "Rękawice"}</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={img.Jackets} />
            <span>{main === "Wszystkie produkty" && "Rękawice"}</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={img.Jackets} />
            <span>{main === "Wszystkie produkty" && "Rękawice"}</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={img.Jackets} />
            <span>{main === "Wszystkie produkty" && "Rękawice"}</span>
          </Link>
        </li>
      </ul> */}
    </div>
  );
};

export default HoverMenu;
