import React, { useEffect, useState } from "react";
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
import Cart from "./components/Shop/Cart/Cart";
import CartBtn from "./components/Shop/Cart/CartBtn";
import SubmitShopping from "./components/Shop/SubmitShopping";

const App = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  //STATE
  const [siteInfo, setSiteInfo] = useState("");
  const [showAuth, setShowAuth] = useState(false);
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
  const showAuthHandler = () => {
    //I am just passing the opening function through header to Top header
    setShowAuth((prev) => !prev);
  };
  const showCartHandler = (boolean) => {
    setShowCart(boolean);
  };

  // const [user, setUser] = useState();
  // const [profile, setProfile] = useState();
  // console.log(profile);
  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => {
  //     setUser(codeResponse);
  //     console.log(codeResponse);
  //   },
  //   onError: (error) => console.log("Login Failed:", error),
  // });

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         setProfile(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

  // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  return (
    <BrowserRouter>
      <Header
        openPhoneMenu={openPhoneMenu}
        onHandleShow={showCartHandler}
        showAuth={showAuthHandler}
      />

      {showAuth && <Auth showAuth={showAuthHandler} />}
      <PhoneMenu openPhoneMenu={openPhoneMenu} showPhoneMenu={showPhoneMenu} />

      <MainLayout position="top-right">
        <Routes>
          <Route path="/news-letter" element={<NewsLetterPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verification" element={<AccountVerification />} />

          <Route path="/sklep" element={<Shop />} />
          <Route path="/sklep/product/:id" element={<ProductDetails />} />
          {users.auth && users.data.verified && (
            <Route
              path="/koszyk/*"
              element={<SubmitShopping cart={users.cart} />}
            />
          )}

          {users.auth ? (
            <Route path="/profile/*" element={<Profile users={users} />} />
          ) : null}

          <Route path="*" element={<Home siteInfo={siteInfo} />} />
        </Routes>
      </MainLayout>

      <Cart
        show={showCart}
        onHandleShow={showCartHandler}
        onShowAuthHandler={showAuthHandler}
        users={users}
        hamburger
      />
      <CartBtn onHandleShow={showCartHandler} cart={users.cart} />
      <Footer siteInfo={siteInfo} />
    </BrowserRouter>
  );
};

export default App;
