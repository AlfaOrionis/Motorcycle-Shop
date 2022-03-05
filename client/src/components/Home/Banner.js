import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Navigation/Header/header.module.css";

import img from "../../Images/BannerIMG/auto2.png";
import img2 from "../../Images/BannerIMG/Motorcycle1.jpg";
import img3 from "../../Images/BannerIMG/Motorcycle2.png";

const Banner = () => {
  const [step, setStep] = useState(0);

  const array = [
    {
      picture: img,
      text: "Walentynkowy Rabat -15 %",
    },
    {
      picture: img2,
      text: "Produkty najwyższej jakości",
    },
    {
      picture: img3,
      text: "Nie czekaj, kupuj!",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        if (step < 2) {
          setStep((prev) => prev + 1);
        } else setStep(0);
      }
    }, 7000);
    return () => (isMounted = false);
  }, [step]);

  return (
    <div className={styles.BottomDiv}>
      <div className={styles.wrapper}>
        <h1 className={styles.BannerTitle}>
          <Link style={{ textDecoration: "none" }} to="/">
            <span>{array[step].text}</span>
          </Link>
        </h1>
        <img src={array[step].picture} alt="Banner" />
      </div>
    </div>
  );
};

export default Banner;
