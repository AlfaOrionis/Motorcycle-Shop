import styles from "./shop.module.css";
import { Link } from "react-router-dom";
import PaginationPage from "./PaginationPage";
import PaginationFilterCard from "./PaginationFilterCard";
import { useState } from "react";

const PaginationCard = ({
  limitState,
  orderState,
  sortByState,
  products,
  onkeywordsHandler,
  onGoToPrev,
  onGoToNext,
  onHandleSortByPrice,
  onHandleSortByDate,
  onHandleLimit,
  //props for PaginationFIlterCard
  categories,
  brands,
  categoriesState,
  onHandleMinimum,
  onHandleMaximum,
  onSizeHandler,
  oncategoryHandler,
  onBrandHandler,
}) => {
  const [showFiltering, setShowFiltering] = useState(false);

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

        <p>Produkty</p>
      </div>
      <div className={styles.columnContainer}>
        <div className={styles.formWrapper}>
          <form>
            <input
              onChange={(e) => onkeywordsHandler(e.target.value)}
              placeholder="Wpisz czego szukasz"
            />

            <button disabled>
              SZUKAJ <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowFiltering((prev) => !prev);
              }}
              className={styles.filterBtn}
            >
              FILTRUJ <i className="fa-solid fa-sort"></i>
            </button>
          </form>
        </div>
        <div className={styles.paginationWrapper}>
          <ul>
            <h3>Pokaż:</h3>
            <li>
              <button
                className={
                  sortByState === "date" && orderState === "desc"
                    ? `${styles.active}`
                    : null
                }
                onClick={() => onHandleSortByDate("desc")}
              >
                Nowo dodane
              </button>
            </li>
            <li>
              <button>Popularne</button>
            </li>
            <li>
              <button
                className={
                  sortByState === "price" && orderState === "desc"
                    ? `${styles.active}`
                    : null
                }
                onClick={() => onHandleSortByPrice("desc")}
              >
                Najdroższe
              </button>
            </li>
            <li>
              <button
                className={
                  sortByState === "price" && orderState === "asc"
                    ? `${styles.active}`
                    : null
                }
                onClick={() => onHandleSortByPrice("asc")}
              >
                Najtańsze
              </button>
            </li>
          </ul>

          <div className={styles.limitWrapper}>
            <h3>Wyświetl:</h3>
            <div>
              <button
                className={limitState === 10 ? `${styles.active}` : null}
                onClick={() => {
                  onHandleLimit(10);
                }}
              >
                10
              </button>
              <button
                className={limitState === 20 ? `${styles.active}` : null}
                onClick={() => {
                  onHandleLimit(20);
                }}
              >
                20
              </button>
              <button
                className={limitState === 50 ? `${styles.active}` : null}
                onClick={() => {
                  onHandleLimit(50);
                }}
              >
                50
              </button>
            </div>
          </div>

          <PaginationPage
            products={products}
            onGoToPrev={onGoToPrev}
            onGoToNext={onGoToNext}
          />
        </div>
      </div>
      {showFiltering && window.innerWidth < 1024 && (
        <PaginationFilterCard
          phoneType={true}
          categories={categories}
          brands={brands}
          categoriesState={categoriesState}
          onHandleMinimum={onHandleMinimum}
          onHandleMaximum={onHandleMaximum}
          onSizeHandler={onSizeHandler}
          oncategoryHandler={oncategoryHandler}
          onBrandHandler={onBrandHandler}
        />
      )}
    </div>
  );
};

export default PaginationCard;
