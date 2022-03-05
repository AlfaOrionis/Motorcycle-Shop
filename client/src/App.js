import React, { useEffect, useState, useCallback, useMemo } from "react";
import Header from "./components/Navigation/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./components/Navigation/Footer/Footer";
import Home from "./components/Home";
import Auth from "./components/Auth";
import MainLayout from "./hoc/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { userIsAuth } from "./store/actions/users.actions";
import Profile from "./components/Profile/Profile";
import PhoneMenu from "./components/Navigation/PhoneMenu";
import Shop from "./components/Shop";
import AccountVerification from "./components/Auth/AccountVerification";
import ResetPassword from "./components/Auth/ResetPassword";
import NewsLetterPage from "./components/Auth/NewsLetterPage";
import ProductDetails from "./components/Shop/ProductDetails";
import CartHamburger from "./components/Shop/Cart.js/CartHamburger";
import CartBtn from "./components/Shop/Cart.js/CartBtn";
import { Backdrop } from "./utills/Modal";

const App = () => {
  console.log("OK");
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  //STATE
  const [siteInfo, setSiteInfo] = useState("");
  const [openAuth, setOpenAuth] = useState(false);
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  //USE EFFECT
  useEffect(() => {
    fetch("/api/site/site")
      .then((res) => res.json())
      .then((res) => setSiteInfo(res));

    dispatch(userIsAuth());
  }, [dispatch]);

  const openPhoneMenu = () => {
    setShowPhoneMenu((prev) => !prev);
  };
  const openAuthHandle = () => {
    //I am just passing the opening function through header to Top header
    setOpenAuth((prev) => !prev);
  };
  const showCartHandler = (boolean) => {
    setShowCart(boolean);
  };

  return (
    <BrowserRouter>
      <Header openPhoneMenu={openPhoneMenu} onOpenAuth={openAuthHandle} />
      {openAuth && <Auth onOpenAuth={openAuthHandle} />}
      <PhoneMenu showPhoneMenu={showPhoneMenu} />
      <MainLayout>
        <Routes>
          <Route path="/news-letter" element={<NewsLetterPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verification" element={<AccountVerification />} />

          <Route path="/sklep" element={<Shop />} />
          <Route path="/sklep/product/:id" element={<ProductDetails />} />

          {users.auth ? (
            <Route path="/profile/*" element={<Profile users={users} />} />
          ) : null}

          <Route path="*" element={<Home siteInfo={siteInfo} />} />
        </Routes>
      </MainLayout>
      {showCart && <Backdrop onCloseModal={() => showCartHandler(false)} />}
      <CartHamburger show={showCart} onHandleShow={showCartHandler} />
      <CartBtn onHandleShow={showCartHandler} />
      <Footer siteInfo={siteInfo} />
    </BrowserRouter>
  );
};

export default App;
