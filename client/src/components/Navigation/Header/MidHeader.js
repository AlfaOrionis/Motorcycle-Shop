import React from "react";

import styles from "./header.module.css";
const NavHeader = () => {
  return (
    <nav className={styles.MidHeader}>
      <ul>
        <li>
          Wszystkie produkty <i className="fa-solid fa-angle-down"></i>
        </li>
        <li>
          Ubrania <i className="fa-solid fa-angle-down"></i>
        </li>
        <li>
          Akcesoria motocyklowe <i className="fa-solid fa-angle-down"></i>
        </li>

        <li className={styles.categories}>
          <span> Kategorie</span>
          <i className="fa-solid fa-angle-down"></i>
        </li>
      </ul>
    </nav>
  );
};

export default NavHeader;
