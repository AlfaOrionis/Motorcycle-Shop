import React from "react";
import styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.Wrapper}>
        <h1 className={styles.logo}> MotorcycleShop</h1>
        <p>
          Motobanda.pl to sklep motocyklowy, portal i kanał na YouTube -
          nagrywamy i publikujemy testy motocykli nowych i używanych a także
          ubrań motocyklowych - kasków, rękawiczek, butów jak i akcesoriów oraz
          części. Piszemy poradniki motocyklowe, artykuły o nauce jazdy i
          technikach jazdy motocyklem. Współpracujemy chętnie z zawodnikami i
          pasjonatami każdego sportu motocyklowego. Nasz sklep mieści się w
          Czerwonaku obok Poznania na ulicy Gdyńska 19, 62-004 Czerwonak.
        </p>
      </div>
      <div className={styles.NavWrapper}>
        <div>
          <span>Sklep stacjonarny: </span> <span>Wrocławska 26a/7</span>
        </div>
        <div>
          <span>Telefon: </span> <span>170963342</span>
        </div>
        <div>
          <span>Napisz do nas: </span>
          <span>
            <a href="MotorcycleShop@gmail.com">MotorcycleShop@gmail.com</a>
          </span>
        </div>
        <span> Jesteśmy na:</span>
        <div className={styles.iconsWrapper}>
          <a href="www.facebook.com" className={styles.icon}>
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="www.facebook.com" className={styles.icon}>
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="www.facebook.com" className={styles.icon}>
            <i className="fa-brands fa-twitter"></i>
          </a>{" "}
          <a href="www.facebook.com" className={styles.icon}>
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
