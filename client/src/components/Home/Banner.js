import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Navigation/Header/header.module.css";
const Banner = () => {
  const [step, setStep] = useState(0);

  const array = [
    {
      picture:
        "https://wallpaperbat.com/img/221000-download-2560x1080-ferrari-f40-back-view-lights-sport-cars.png",
      text: "Produkty najwyższej jakości",
    },
    {
      picture:
        "https://c.wallhere.com/photos/71/57/sunset_panorama_6_sun_hot_sexy_cars_beautiful-845610.jpg!d",
      text: "Walentynkowy Rabat -15 %",
    },
    {
      picture:
        "https://www.gamewallpapers.com/img_script/wallpaper_dir/img.php?src=wallpaper_cyberpunk_2077_62_5120x1440.jpg&height=506&sharpen",
      text: "Nie czekaj, kupuj!",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      if (step < 2) {
        setStep((prev) => prev + 1);
      } else setStep(0);

      console.log(step);
    }, 5000);
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
