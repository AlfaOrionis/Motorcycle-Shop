import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";
const Footer = ({ siteInfo }) => {
  return (
    <div className={styles.Footer}>
      <div className={styles.wrapper}>
        <div className={styles.firstContainer}>
          <div>
            <h2>Sklep stacjonarny </h2>
            <a href="https://goo.gl/maps/JbiXYxCsA1wiYsk87" target="_blank">
              <i
                style={{ color: "red", marginRight: "5px" }}
                className="fa-solid fa-location-dot"
              ></i>
              {siteInfo && siteInfo.address}
            </a>

            <h2>Napisz do nas: </h2>
            <span>
              <a href="Sklep@MotorcycleShop.com">Sklep@MotorcycleShop.com</a>
            </span>
            <span>
              <a href="Kontakt@MotorcycleShop.com">
                Kontakt@MotorcycleShop.com
              </a>
            </span>
            <span>
              <a href="Reklamacje@MotorcycleShop.com">
                Reklamacje@MotorcycleShop.com
              </a>
            </span>
          </div>
          <div>
            <h2>Pomoc</h2>
            <ul>
              <li>
                <a href="/Zwroty">Zwroty I wymiany</a>
              </li>
              <li>
                <a href="/Dostawa">Dostawa I płatności</a>
              </li>
              <li>
                <a href="/Realizacja">Czas realizacji zamówienia</a>
              </li>
              <li>
                <a href="/Gwarancja">Gwarancja</a>
              </li>
              <li>
                <a href="/Regulamin">Regulamin</a>
              </li>
              <li>
                <a href="/Polityka">Polityka prywatności</a>
              </li>
              <li>
                <a href="/Zaloguj_się">Zaloguj się</a>
              </li>
            </ul>
          </div>

          <div>
            <h2>O nas</h2>
            <ul>
              <li>
                <a href="/Kontakt">Kontakt</a>
              </li>
              <li>
                <a href="/Bezpieczeństwo"> Bezpieczeństwo zakupów</a>
              </li>
              <li>
                <a href="/Informacje">Informacje dla reklamodawców</a>
              </li>
            </ul>
          </div>

          <h2> Jesteśmy na:</h2>
          <div className={styles.iconsWrapper}>
            <a href="www.facebook.com" className={styles.icon}>
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="www.facebook.com" className={styles.icon}>
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="www.facebook.com" className={styles.icon}>
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="www.facebook.com" className={styles.icon}>
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className={styles.secondContainer}>
          <h1 className={styles.logo}> MotorcycleShop</h1>
          <p>
            Motobanda.pl to sklep motocyklowy, portal i kanał na YouTube -
            nagrywamy i publikujemy testy motocykli nowych i używanych a także
            ubrań motocyklowych - kasków, rękawiczek, butów jak i akcesoriów
            oraz części. Piszemy poradniki motocyklowe, artykuły o nauce jazdy i
            technikach jazdy motocyklem. Współpracujemy chętnie z zawodnikami i
            pasjonatami każdego sportu motocyklowego. Nasz sklep mieści się w
            Czerwonaku obok Poznania na ulicy Gdyńska 19, 62-004 Czerwonak.
          </p>
          <h2>Sklep</h2>
          <ul>
            <li>
              <a href="/">Kaski motocyklowe</a>
            </li>
            <li>
              <a href="/">Rękawice motocyklowe</a>
            </li>
            <li>
              <a href="/">Spodnie motocyklowe</a>
            </li>
            <li>
              <a href="/">Kombinezony motocyklowe</a>
            </li>
            <li>
              <a href="/">Kurtki motocyklowe</a>
            </li>
            <li>
              <a href="/">Akcesoria motocyklowe</a>
            </li>
            <li>
              <a href="/">Chemia motocyklowa</a>
            </li>
            <li>
              <a href="/">Elektronika</a>
            </li>
            <li>
              <a href="/">Pokrowce</a>
            </li>
            <li>
              <a href="/">Ochraniacze</a>
            </li>
            <li>
              <a href="/">Bony zakupowe</a>
            </li>
            <li>
              <a href="/">Poduszki powietrzne</a>
            </li>
            <li>
              <a href="/">Inne</a>
            </li>
            <li>
              <a href="/">Ciężarki do kierownicy</a>
            </li>
            <li>
              <a href="/">Tankpady</a>
            </li>
            <li>
              <a href="/">Naklejki</a>
            </li>
          </ul>

          <h2>POPULARNE</h2>
          <ul>
            <li>
              <Link to="/"> OZONE</Link>
            </li>
            <li>
              <Link to="/">ALPINESTARS</Link>
            </li>
            <li>
              <Link to="/">CBERG</Link>
            </li>
            <li>
              <Link to="/">SHIMA</Link>
            </li>
            <li>
              <Link to="/">REBELHORN</Link>
            </li>
            <li>
              <Link to="/">SHARK</Link>
            </li>
            <li>
              <Link to="/">SPIDI</Link>
            </li>
            <li>
              <Link to="/">LAVER</Link>
            </li>
            <li>
              <Link to="/">MABOLO</Link>
            </li>
            <li>
              <Link to="/">REBELHORN</Link>
            </li>
            <li>
              <Link to="/">MT HELMETS</Link>
            </li>
            <li>
              <Link to="/">SHOEI</Link>
            </li>
          </ul>

          <h2>MOTOCYKLE</h2>
          <ul>
            <li>
              <Link to="/">KAWASAKI</Link>
            </li>
            <li>
              <Link to="/">HONDA</Link>
            </li>
            <li>
              <Link to="/">YAMAHA</Link>
            </li>
            <li>
              <Link to="/">SUZUKI</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className={styles.bottomDescription}>
        Motobanda.pl to sklep motocyklowy, portal i kanał na YouTube - nagrywamy
        i publikujemy testy motocykli nowych i używanych a także ubrań
        motocyklowych - kasków, rękawiczek, butów jak i akcesoriów oraz części.
        Piszemy poradniki motocyklowe, artykuły o nauce jazdy i technikach jazdy
        motocyklem. Współpracujemy chętnie z zawodnikami i pasjonatami każdego
        sportu motocyklowego. Nasz sklep mieści się w Czerwonaku obok Poznania
        na ulicy Gdyńska 19, 62-004 Czerwonak.
      </p>
    </div>
  );
};

export default Footer;
