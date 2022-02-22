import styles from "./shop.module.css";
import * as img from "../../Images/Clothes/Clothes";
import { Link, NavLink } from "react-router-dom";
const Shop = () => {
  return (
    <div className={styles.shopContainer}>
      <div className={styles.paginationCard}>
        <div>
          <ul>
            <li>
              <Link to="/">
                Strona główna <i className="fa-solid fa-angles-right"></i>
              </Link>
            </li>
            <li>
              <Link to="/sklep">
                Sklep <i className="fa-solid fa-angles-right"></i>
              </Link>
            </li>
          </ul>

          <p>KASKI INTEGRALNE </p>
        </div>
        <div className={styles.formWrapper}>
          <form>
            <input placeholder="Wpisz czego szukasz" />
            <button>
              SZUKAJ <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <div>
              {/* <ul>
                <li>
                  <Link to="/">1</Link>
                </li>
                <li>
                  <Link to="/">1</Link>
                </li>
                <li>
                  <Link to="/">1</Link>
                </li>
                <li>
                  <Link to="/">1</Link>
                </li>
              </ul> */}
            </div>
            <ul>
              <h3>Pokaż:</h3>
              <li>
                <NavLink
                  className={(a) => (a.isActive ? `${styles.active}` : null)}
                  to="/sklep"
                >
                  Najtańsze
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(a) => (a.isActive ? `${styles.active}` : null)}
                  to="/"
                >
                  Najtańsze
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(a) => (a.isActive ? `${styles.active}` : null)}
                  to="/"
                >
                  Najtańsze
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(a) => (a.isActive ? `${styles.active}` : null)}
                  to="/"
                >
                  Najtańsze
                </NavLink>
              </li>
            </ul>
          </form>
        </div>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.imgWrap}>
          <img src={img.Helmets} />
          <h2>KASK MT THUNDER 22 KID</h2>
        </div>
        <div className={styles.productDescriptionWRAPPER}>
          <div className={styles.productAttributes}>
            <p>
              <span>
                <i className="fa-solid fa-cart-arrow-down"></i> Cena
              </span>
              <span>
                od: <span>389,00 zł </span>
              </span>
            </p>

            <ul>
              <li>
                <h3>Ochraniacze</h3> <p>3 pary na łokcie</p>
              </li>
              <li>
                <h3>Waga</h3> <p>1500g</p>
              </li>
              <li>
                <h3>Ognioodporny</h3> <p>Jeszcze jak</p>
              </li>
              <li>
                <h3>Drogi</h3>{" "}
                <p>Troche tak ale w sumie to nie Lorem ipsum tede a</p>
              </li>
            </ul>
          </div>
          <div className={styles.imagesContainer}>
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.imgWrap}>
          <img src={img.Helmets} />
          <h2>KASK MT THUNDER 22 KID</h2>
        </div>
        <div className={styles.productDescriptionWRAPPER}>
          <div className={styles.productAttributes}>
            <p>
              <span>
                <i className="fa-solid fa-cart-arrow-down"></i> Cena
              </span>
              <span>
                od: <span>389,00 zł </span>
              </span>
            </p>

            <ul>
              <li>
                <h3>Ochraniacze</h3> <p>3 pary na łokcie</p>
              </li>
              <li>
                <h3>Waga</h3> <p>1500g</p>
              </li>
              <li>
                <h3>Ognioodporny</h3> <p>Jeszcze jak</p>
              </li>
              <li>
                <h3>Drogi</h3>{" "}
                <p>Troche tak ale w sumie to nie Lorem ipsum tede a</p>
              </li>
            </ul>
          </div>
          <div className={styles.imagesContainer}>
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.imgWrap}>
          <img src={img.Helmets} />
          <h2>KASK MT THUNDER 22 KID</h2>
        </div>
        <div className={styles.productDescriptionWRAPPER}>
          <div className={styles.productAttributes}>
            <p>
              <span>
                <i className="fa-solid fa-cart-arrow-down"></i> Cena
              </span>
              <span>
                od: <span>389,00 zł </span>
              </span>
            </p>

            <ul>
              <li>
                <h3>Ochraniacze</h3> <p>3 pary na łokcie</p>
              </li>
              <li>
                <h3>Waga</h3> <p>1500g</p>
              </li>
              <li>
                <h3>Ognioodporny</h3> <p>Jeszcze jak</p>
              </li>
              <li>
                <h3>Drogi</h3>{" "}
                <p>Troche tak ale w sumie to nie Lorem ipsum tede a</p>
              </li>
            </ul>
          </div>
          <div className={styles.imagesContainer}>
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.imgWrap}>
          <img src={img.Helmets} />
          <h2>KASK MT THUNDER 22 KID</h2>
        </div>
        <div className={styles.productDescriptionWRAPPER}>
          <div className={styles.productAttributes}>
            <p>
              <span>
                <i className="fa-solid fa-cart-arrow-down"></i> Cena
              </span>
              <span>
                od: <span>389,00 zł </span>
              </span>
            </p>

            <ul>
              <li>
                <h3>Ochraniacze</h3> <p>3 pary na łokcie</p>
              </li>
              <li>
                <h3>Waga</h3> <p>1500g</p>
              </li>
              <li>
                <h3>Ognioodporny</h3> <p>Jeszcze jak</p>
              </li>
              <li>
                <h3>Drogi</h3>{" "}
                <p>Troche tak ale w sumie to nie Lorem ipsum tede a</p>
              </li>
            </ul>
          </div>
          <div className={styles.imagesContainer}>
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>{" "}
            <Link to="/">
              <img src={img.Helmets} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
