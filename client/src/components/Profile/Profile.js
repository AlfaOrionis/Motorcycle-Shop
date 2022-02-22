import styles from "./profile.module.css";
import avatar from "../../Images/avatarpic.png";
import { Routes, Route, Link } from "react-router-dom";
import ProfileSettings from "./ProfileSettings";
import ProfileOptions from "./ProfileOptions";
import AdminProducts from "../Admin/AdminProducts";

const Profile = (props) => {
  return (
    <div className={styles.profileLayout}>
      <ProfileOptions users={props.users} />

      <Routes>
        <Route path="/" element={<ProfileSettings users={props.users} />} />
        <Route path="/history" element={<AdminProducts />} />
        <Route path="/favourites" element={<ProfileSettings />} />
        <Route path="/addproducts" element={<ProfileSettings />} />
        <Route path="/admin_products" element={<AdminProducts />} />
        <Route path="/history" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
};

export default Profile;
