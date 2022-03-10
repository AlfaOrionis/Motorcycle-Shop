import { Link } from "react-router-dom";
import Slider from "react-slick";
import styles from "../components/Home/home.module.css";
import React from "react";
import { imageCheck } from "./tolls";

//styling of the arrows is in index.css
var settings = {
  infinite: true,
  speed: 500,
  slidesToShow: window.innerWidth > 766 ? 4 : 2,
  arrows: true,
};

const TheSlider = ({ prods, title, value, type }) => {
  const linkTo = `/sklep?${type}=${value}`;

  return (
    <>
      <Link className={styles.sliderTitle} to={linkTo}>
        <h1>{title}</h1>
        <span>(Zobacz wszystkie)</span>
      </Link>
      <div className={styles.sliderWrapper}>
        <Slider {...settings}>
          {prods &&
            prods.map((prod) => (
              <div className={styles.sliderDiv} key={prod._id}>
                <Link
                  style={{ height: "100%", position: "relative" }}
                  to={`/sklep/product/${prod._id}`}
                >
                  <img src={imageCheck(prod)} />

                  <h3>
                    <span style={{ fontWeight: "400" }}>od </span>
                    {prod.price + ",00 zł"}
                  </h3>
                  <h2>{prod.name}</h2>
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default React.memo(TheSlider);
