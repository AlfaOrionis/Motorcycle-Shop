import styles from "./admin.module.css";
import { Pagination } from "react-bootstrap";

const ProductsPagination = ({
  onKeywordsHandler,
  onBrandHandler,
  onGoToPrev,
  onGoToNext,
  products,
  brands,
}) => {
  return (
    <>
      <input
        placeholder="Wyszukaj produkt"
        onChange={(e) => {
          onKeywordsHandler(e.target.value);
        }}
      />
      <div className={styles.allBrands}>
        {brands &&
          brands.length > 0 &&
          brands.map((brand) => (
            <div key={brand._id}>
              <label htmlFor={brand.name}>{brand.name}</label>
              <input
                onChange={() => {
                  onBrandHandler(brand._id);
                }}
                type="checkbox"
                id={brand.name}
              />
            </div>
          ))}
      </div>
      <Pagination>
        {products && products.hasPrevPage && (
          <>
            <Pagination.Prev onClick={onGoToPrev} />
            <Pagination.Item onClick={onGoToPrev}>
              {products.prevPage}
            </Pagination.Item>
          </>
        )}
        <Pagination.Item active>{products && products.page}</Pagination.Item>
        {products && products.hasNextPage && (
          <>
            <Pagination.Item onClick={onGoToNext}>
              {products.nextPage}
            </Pagination.Item>
            <Pagination.Next onClick={onGoToNext} />
          </>
        )}
      </Pagination>
    </>
  );
};

export default ProductsPagination;
