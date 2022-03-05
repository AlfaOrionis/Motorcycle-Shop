import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AdvertisementBanner from "./AdvertisementBanner";
import TheSlider from "../../utills/Slider";
import Categories from "./Categories";
import Banner from "./Banner";

const Home = (props) => {
  const [products, setProducts] = useState();
  console.log("HOME RENDER");
  useEffect(() => {
    const prods = fetch("/api/products/get_products_from_main_categories")
      .then((res) => res.json())
      .then((res) => setProducts(res));
  }, []);

  const helmets = products && products[0].Kaski;
  const jackets = products && products[1].Kurtki;
  const gloves = products && products[2].Rękawice;
  const shoes = products && products[3].Buty;
  const pants = products && products[4].Spodnie;
  const suits = products && products[5].Stroje;
  const bestSellers = products && products[6].bestSellers;

  return (
    <>
      <Banner />
      <main className={styles.main}>
        <Categories />
        <AdvertisementBanner siteInfo={props.siteInfo} />
        <TheSlider prods={bestSellers} title={"Najczęściej kupowane:"} />
        <TheSlider
          prods={helmets}
          title={"Kaski motocyklowe:"}
          catId={"6216160087b585df4240a5ec"}
        />
        <TheSlider
          prods={jackets}
          title={"Kurtki motocyklowe:"}
          catId={"621615ec87b585df4240a5dc"}
        />
        <TheSlider
          prods={gloves}
          title={"Rękawice motocyklowe:"}
          catId={"621615fd87b585df4240a5e8"}
        />
        <TheSlider
          prods={shoes}
          title={"Buty motocyklowe:"}
          catId={"621615f987b585df4240a5e4"}
        />
        <TheSlider
          prods={pants}
          title={"Spodnie motocyklowe:"}
          catId={"621615f487b585df4240a5e0"}
        />
        <TheSlider
          prods={suits}
          title={"Kombinezony motocyklowe:"}
          catId={"621f591be042ba3914ba0723"}
        />
      </main>
    </>
  );
};

export default React.memo(Home);
