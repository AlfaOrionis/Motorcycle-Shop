import React from "react";
import TopHeader from "./TopHeader";
import { useLocation } from "react-router-dom";
import MidHeader from "./MidHeader";
const Header = (props) => {
  const location = useLocation();

  return (
    <header>
      <TopHeader onHandleShow={props.onHandleShow} showAuth={props.showAuth} />
      {location.pathname.includes("/koszyk") ? null : (
        <MidHeader openPhoneMenu={props.openPhoneMenu} />
      )}
    </header>
  );
};

export default Header;
