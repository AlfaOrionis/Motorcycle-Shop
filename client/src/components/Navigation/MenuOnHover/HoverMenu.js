import { Link } from "react-router-dom";
import styles from "./menuOnHover.module.css";
import * as img from "../../../Images/Clothes/Clothes";

const HoverMenu = ({ category, open, close }) => {
  const clothes = [
    { name: "Rękawice", img: img.Gloves, category: "621615fd87b585df4240a5e8" },
    { name: "Kaski", img: img.Helmets, category: "6216160087b585df4240a5ec" },
    { name: "Spodnie", img: img.Pants, category: "621615f487b585df4240a5e0" },
    { name: "Stroje", img: img.Suits, category: "621f591be042ba3914ba0723" },
    { name: "Buty", img: img.Shoes, category: "621615f987b585df4240a5e4" },
    { name: "Kurtki", img: img.Jackets, category: "621615ec87b585df4240a5dc" },
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
              <Link
                onClick={close}
                to={`/sklep?categories=${
                  product.category ? product.category : ""
                }`}
              >
                <img src={product.img} />
                <span>{product.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HoverMenu;
