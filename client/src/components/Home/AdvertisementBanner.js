import styles from "./AdvertisementBanner.module.css";
import { Link } from "react-router-dom";

const AdvertisementBanner = (props) => {
  const fullIMG = props.siteInfo && props.siteInfo.AdvertisementIMG.fullIMG;
  const phoneIMG = props.siteInfo && props.siteInfo.AdvertisementIMG.phoneIMG;

  return (
    <div className={styles.AdvertisementBanner}>
      <Link to="/sklep">
        <img src={window.innerWidth > 550 ? fullIMG : phoneIMG}></img>
      </Link>
    </div>
  );
};

export default AdvertisementBanner;
