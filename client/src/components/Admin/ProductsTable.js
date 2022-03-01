import { Table } from "react-bootstrap";
import styles from "./admin.module.css";
import Loader from "../../utills/Loader";

const ProductsTable = ({ prods, onGetToRemove }) => {
  if (prods && prods.docs.length > 0) {
    return (
      <Table className={styles.prodTable} striped bordered hover>
        <thead>
          <tr>
            <th>Stworzono</th>
            <th>Nazwa</th>
            <th>Marka </th>
            <th>Dostępnych</th>
          </tr>
        </thead>

        <tbody>
          {prods.docs.map((prod) => (
            <tr key={prod._id}>
              <td>
                <span className={styles.date}>
                  {new Date(prod.date).toLocaleString().split(",")[0]}
                </span>
                <span>
                  {new Date(prod.date).toLocaleString().split(",")[1]}
                </span>
              </td>
              <td>{prod.name}</td>
              <td>{prod.brand.name}</td>
              <td className={styles.sizes}>
                {prod.size.s +
                  prod.size.m +
                  prod.size.l +
                  prod.size.xl +
                  prod.size.xxl}
                <i className="fa-solid fa-angle-down "></i>
                <div>
                  <span> s: {prod.size.s}</span>
                  <span> m: {prod.size.m}</span>
                  <span> l: {prod.size.l}</span>
                  <span> xl: {prod.size.xl}</span>
                  <span> xxl: {prod.size.xxl}</span>
                </div>
              </td>
              <td>
                <button
                  onClick={() => {
                    onGetToRemove(prod._id);
                  }}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </td>
              <td>
                <button className={styles.editBtn}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else if (prods && prods.docs.length < 1) {
    return <p>Nie ma takiego produktu.</p>;
  } else {
    return <Loader />;
  }
};

export default ProductsTable;
