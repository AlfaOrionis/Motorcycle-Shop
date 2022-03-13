import styles from "./profile.module.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProfileSettings from "./ProfileSettings";
import ProfileOptions from "./ProfileOptions";
import Admin from "../Admin";
import AddProduct from "../Admin/AddProduct";
import AddRemoveBrandCategory from "../Admin/AddRemoveBrandCategory";
import { useDispatch } from "react-redux";
import { userIsAuth } from "../../store/actions/users.actions";
import OrderHistory from "./OrderHistory";
const Profile = (props) => {
  const dispatch = useDispatch();
  //I wanna refresh the user data everytime he comes to profile and check if he still has valid token, i consider doing it as authGuard wrapper component,  with all the components that required to be signIn
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userIsAuth());
  }, [dispatch]);

  return (
    <div className={styles.profileLayout}>
      <ProfileOptions users={props.users} />
      <div className={styles.profileRoutesWrapper}>
        <Routes>
          <Route path="/" element={<ProfileSettings users={props.users} />} />
          <Route
            path="/history"
            element={<OrderHistory users={props.users} />}
          />
          <Route path="/admin_add_product" element={<AddProduct />} />
          <Route path="/admin_products" element={<Admin />} />
          <Route
            path="/admin_add_brand_category"
            element={<AddRemoveBrandCategory />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
