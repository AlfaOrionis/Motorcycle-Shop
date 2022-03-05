import styles from "./shop.module.css";

const PaginationFilterCard = ({
  brands,
  categories,
  onBrandHandler,
  oncategoryHandler,
  onSizeHandler,
  onHandleMinimum,
  onHandleMaximum,
  categoriesState,
  phoneType,
}) => {
  const sizes = ["s", "m", "l", "xl", "xxl"];

  return (
    <div
      className={`${styles.productsPagination} ${
        phoneType ? styles.phoneType : ""
      }`}
    >
      <h2>Filtry</h2>

      <div>
        <h3>Cena</h3>
        <div>
          <input
            onChange={(e) => onHandleMinimum(e.target.value)}
            type="number"
            placeholder="Od"
          />
          <input
            onChange={(e) => onHandleMaximum(e.target.value)}
            type="number"
            placeholder="Do"
          />
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
                  checked={categoriesState.includes(category._id)}
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
