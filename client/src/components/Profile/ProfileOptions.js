import styles from "./profile.module.css";
import avatar from "../../Images/avatarpic.png";

import { Link } from "react-router-dom";

const options = [
  { text: "Profil", link: "/profile" },
  { text: "Historia zakupów", link: "/profile/history" },
  { text: "Koszyk", link: "/koszyk" },
];

const adminOptions = [
  { text: "Products", link: "/profile/admin_products" },
  { text: "Add product", link: "/profile/admin_add_product" },
  { text: "Add brand/category", link: "/profile/admin_add_brand_category" },
  { text: "Manage site", link: "/profile/admin_manage_site" },
];

const ProfileOptions = (props) => {
  const unverifiedWarning = () => {
    if (!props.users.data.verified) {
      return (
        <span className={styles.unverified}>
          <i className="fa-solid fa-circle-exclamation"></i> Aby zweryfikować
          swój adres e-mail, sprawdź skrzynkę pocztową i postępuj zgodnie z
          instrukcjami.
        </span>
      );
    } else return <span className={styles.unverified}></span>;
  };

  return (
    <div className={styles.profileContainer}>
      <div>
        <div className={styles.imgContainer}>
          <img src={avatar} />
        </div>
        <span>{props.users.data.email}</span>
        <span className={styles.unverified}>{unverifiedWarning()}</span>
      </div>
      <ul className={styles.profileNav}>
        {options.map((option) => (
          <Link
            style={{ textDecoration: "none" }}
            to={option.link}
            key={option.text}
          >
            {option.text}
          </Link>
        ))}

        {props.users.data.role === "admin" && <h2>Admin options</h2>}

        {props.users.data.role === "admin" &&
          adminOptions.map((option) => (
            <Link
              style={{ textDecoration: "none" }}
              to={option.link}
              key={option.text}
            >
              {option.text}
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default ProfileOptions;
