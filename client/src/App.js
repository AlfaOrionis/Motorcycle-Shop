import React, { useState } from "react";
import Header from "./components/Navigation/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./components/Navigation/Footer/Footer";
import Home from "./components/Home";
import Auth from "./components/Auth";

const App = () => {
  const [openAuth, setOpenAuth] = useState(false);

  const openAuthHandle = () => {
    setOpenAuth((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Header onOpenAuth={openAuthHandle} />
      {openAuth && <Auth onOpenAuth={openAuthHandle} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<Auth />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
