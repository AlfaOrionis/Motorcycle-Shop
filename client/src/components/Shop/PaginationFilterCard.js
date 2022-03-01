import styles from "./shop.module.css";

const PaginationFilterCard = ({
  brands,
  categories,
  onBrandHandler,
  oncategoryHandler,
  onSizeHandler,
}) => {
  const sizes = ["s", "m", "l", "xl", "xxl"];

  return (
    <div className={styles.productsPagination}>
      <h2>Filtry</h2>

      <div>
        <h3>Cena</h3>
        <div>
          <input type="number" placeholder="Od" />
          <input type="number" placeholder="Do" />
        </div>
      </div>

      <div>
        <h3>Rozmiar</h3>
        <ul>
          {sizes.map((size) => (
            <li key={size}>
              <input
                value={size}
                onChange={() => {
                  onSizeHandler(size);
                }}
                type="checkbox"
              />
              <label>{size}</label>
            </li>
          ))}
        </ul>

        <h3>Marka</h3>

        <ul>
          {brands &&
            brands.map((brand) => (
              <li key={brand._id}>
                <input
                  onChange={() => {
                    onBrandHandler(brand._id);
                  }}
                  value={brand._id}
                  type="checkbox"
                />
                <label>{brand.name}</label>
              </li>
            ))}
        </ul>

        <ul>
          <h3>Kategoria</h3>
          {categories &&
            categories.map((category) => (
              <li key={category._id}>
                <input
                  onChange={() => oncategoryHandler(category._id)}
                  value={category._id}
                  type="checkbox"
                />
                <label>{category.name}</label>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PaginationFilterCard;
