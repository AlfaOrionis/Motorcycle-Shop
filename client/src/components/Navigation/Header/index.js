import React from "react";
import TopHeader from "./TopHeader";

import MidHeader from "./MidHeader";
const Header = (props) => {
  return (
    <header>
      <TopHeader onOpenAuth={props.onOpenAuth} />
      <MidHeader />
    </header>
  );
};

export default Header;
