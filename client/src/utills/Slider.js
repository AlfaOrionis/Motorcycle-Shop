import Slider from "react-slick";
import styles from "../components/Home/home.module.css";

const TheSlider = ({ Helmets }) => {
  //styling of the arrows is in index.css
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
  };

  return (
    <div className={styles.helmetsWrapper}>
      <Slider {...settings}>
        <div>
          <img src={Helmets} alt=" KASK"></img>
        </div>
        <div>
          <img src={Helmets} alt=" KASK"></img>
        </div>
        <div>
          <img src={Helmets} alt=" KASK"></img>
        </div>
        <div>
          <img src={Helmets} alt=" KASK"></img>
        </div>
        <div>
          <img src={Helmets} alt=" KASK"></img>
        </div>
      </Slider>
    </div>
  );
};

export default TheSlider;
