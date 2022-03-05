import styles from "./shop.module.css";

import { Pagination } from "react-bootstrap";

const PaginationPage = ({
  products,
  onGoToNext,
  onGoToPrev,
  bottomPagination,
}) => {
  const nextDisabled = products && products.hasNextPage;
  const prevDisabled = products && products.hasPrevPage;

  const scrollTop = () => {
    //If its pagination on the bottom of the page, below the products, (cuz there is also one on the top of page), i want to scroll to the top after the click
    if (bottomPagination) {
      window.scrollTo(0, 0);
    }
  };

  const cursorStyle = { cursor: "not-allowed" };
  return (
    <Pagination className={styles.prodPaginatePage}>
      <Pagination.Prev
        style={!prevDisabled ? cursorStyle : null}
        disabled={!prevDisabled}
        onClick={() => {
          onGoToPrev();
          scrollTop();
        }}
      />
      {products && products.hasPrevPage && (
        <Pagination.Item
          onClick={() => {
            onGoToPrev();
            scrollTop();
          }}
        >
          {products.prevPage}
        </Pagination.Item>
      )}

      <Pagination.Item active>{products && products.page}</Pagination.Item>
      {products && (
        <>
          <Pagination.Item
            style={!nextDisabled ? cursorStyle : null}
            disabled={!nextDisabled}
            onClick={() => {
              onGoToNext();
              scrollTop();
            }}
          >
            {products && products.page + 1}
          </Pagination.Item>
          <Pagination.Next
            style={!nextDisabled ? cursorStyle : null}
            disabled={!nextDisabled}
            onClick={() => {
              onGoToNext();
              scrollTop();
            }}
          />
        </>
      )}
    </Pagination>
  );
};

export default PaginationPage;
