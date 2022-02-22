import React, { useEffect, useState } from "react";
import Header from "./components/Navigation/Header";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Footer from "./components/Navigation/Footer/Footer";
import Home from "./components/Home";
import Auth from "./components/Auth";
import styles from "./components/Navigation/Header/header.module.css";
import MainLayout from "./hoc/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { userIsAuth } from "./store/actions/users.actions";
import Profile from "./components/Profile/Profile";
import PhoneMenu from "./components/Navigation/PhoneMenu";
import Shop from "./components/Shop";

const App = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);

  const [openAuth, setOpenAuth] = useState(false);
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const openPhoneMenu = () => {
    setShowPhoneMenu((prev) => !prev);
  };
  const openAuthHandle = () => {
    //So at this point, i was wondering if i should use redux, but i decided to just pass the opening function through header to Top header
    setOpenAuth((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Header openPhoneMenu={openPhoneMenu} onOpenAuth={openAuthHandle} />
      {openAuth && <Auth onOpenAuth={openAuthHandle} />}

      <PhoneMenu showPhoneMenu={showPhoneMenu} />

      <MainLayout>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/sklep" element={<Shop />} />
          {users.auth ? (
            <Route path="/profile/*" element={<Profile users={users} />} />
          ) : null}
        </Routes>
      </MainLayout>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
