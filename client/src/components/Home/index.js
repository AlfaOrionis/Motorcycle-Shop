import React from "react";
import styles from "./home.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as img from "../../Clothes/Clothes";

import TheSlider from "../utills/Slider";
import Categories from "./Categories";
import Banner from "./Banner";

const Home = (props) => {
  return (
    <>
      <Banner />
      <main className={styles.main}>
        <Categories />

        <TheSlider Helmets={img.Helmets} />
        <TheSlider Helmets={img.Jackets} />
        <TheSlider Helmets={img.Shoes} />
      </main>
    </>
  );
};

export default Home;
