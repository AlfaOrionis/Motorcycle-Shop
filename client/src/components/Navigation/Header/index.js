import React from "react";
import TopHeader from "./TopHeader";

import MidHeader from "./MidHeader";
const Header = (props) => {
  return (
    <header>
      <TopHeader showAuth={props.showAuth} />
      <MidHeader openPhoneMenu={props.openPhoneMenu} />
    </header>
  );
};

export default Header;
