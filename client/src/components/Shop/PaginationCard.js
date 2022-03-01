import styles from "./shop.module.css";
import { Link, NavLink } from "react-router-dom";
import { Pagination } from "react-bootstrap";

const PaginationCard = ({ onkeywordsHandler }) => {
  return (
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
      <div className={styles.columnContainer}>
        <div className={styles.formWrapper}>
          <form>
            <input
              onChange={(e) => onkeywordsHandler(e.target.value)}
              placeholder="Wpisz czego szukasz"
            />
            <button>
              SZUKAJ <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className={styles.paginationWrapper}>
          <ul>
            <h3>Pokaż:</h3>
            <li>
              <NavLink
                className={(a) => (a.isActive ? `${styles.active}` : null)}
                to="/sklep"
              >
                Nowo dodane
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(a) => (a.isActive ? `${styles.active}` : null)}
                to="/"
              >
                Popularne
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(a) => (a.isActive ? `${styles.active}` : null)}
                to="/"
              >
                Najdroższe
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

          <Pagination className={styles.prodPaginatePage}>
            <>
              <Pagination.Prev />
              <Pagination.Item>1</Pagination.Item>
            </>

            <Pagination.Item active>1</Pagination.Item>

            <>
              <Pagination.Item>1</Pagination.Item>
              <Pagination.Next />
            </>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default PaginationCard;
