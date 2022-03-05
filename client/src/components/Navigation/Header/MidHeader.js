import React, { useState } from "react";
import { Link } from "react-router-dom";
import HoverMenu from "../MenuOnHover/HoverMenu";
import classes from "../MenuOnHover/menuOnHover.module.css";
import styles from "./header.module.css";

const MidHeader = (props) => {
  const [state, setState] = useState(null);
  //First i used hover to show HoverMenu component and i was planning to make 3 diffrent components for each category, but then i come up with javascript solution "onMouse" that lets me make one universal component and just pass the data, and i will put it here cuz its just simpler for me and it works right.

  const keepMenuOpen = (category) => {
    setState(category);
  };
  const closeMenu = () => {
    setState(null);
  };

  const openPhoneMenu = () => {
    console.log("dziala");
    props.openPhoneMenu();
  };

  const arrowHover = {
    transform: "rotate(180deg) scale(1.2)",
    color: "red",
    margin: "0 0 0 8px",
  };
  return (
    <nav className={styles.MidHeader}>
      {state && (
        <HoverMenu open={keepMenuOpen} close={closeMenu} category={state} />
      )}
      <ul>
        <li
          onClick={() => setState(null)}
          className={classes.productsLi}
          onMouseEnter={() => {
            setState("Wszystkie produkty");
          }}
          onMouseLeave={() => {
            setState(null);
          }}
        >
          <Link to="/sklep">Wszystkie produkty</Link>
          <i
            style={state === "Wszystkie produkty" ? arrowHover : null}
            className="fa-solid fa-angle-down "
          ></i>
        </li>

        <li
          className={classes.productsLi}
          onClick={() => setState(null)}
          onMouseEnter={() => setState("Ubrania")}
          onMouseLeave={() => {
            setState(null);
          }}
        >
          <Link to="/sklep">Ubrania </Link>
          <i
            style={state === "Ubrania" ? arrowHover : null}
            className="fa-solid fa-angle-down "
          ></i>
        </li>

        <li
          onClick={() => setState(null)}
          className={classes.productsLi}
          onMouseEnter={() => setState("Akcesoria")}
          onMouseLeave={() => {
            setState(null);
          }}
        >
          <Link to="/sklep">Akcesoria motocyklowe </Link>
          <i
            style={state === "Akcesoria" ? arrowHover : null}
            className="fa-solid fa-angle-down "
          ></i>
        </li>

        {/* PHONE VERSION BELOW */}

        <button onClick={openPhoneMenu} className={styles.categories}>
          <span> Kategorie</span>
          <i className="fa-solid fa-angle-down"></i>
        </button>
      </ul>
    </nav>
  );
};

export default MidHeader;
