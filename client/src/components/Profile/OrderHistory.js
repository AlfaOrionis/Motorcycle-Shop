import { useEffect } from "react";
import classes from "../Admin/admin.module.css"; //I will use a bit of styling from admin module cuz i also have a bootstrap table there1
import styles from "./profile.module.css";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userOrderHistory } from "../../store/actions/users.actions";

const OrderHistory = ({ users }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userOrderHistory());
  }, []);

  return (
    <div className={styles.orderHistory}>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>Produkty</th>
            <th>Sposób dostawy </th>
            <th>Cena</th>
          </tr>
        </thead>

        <tbody>
          {users.data.history &&
            users.data.history.length > 0 &&
            users.data.history.map((order) => (
              <tr key={order._id}>
                <td>
                  <span className={classes.date}>
                    {new Date(order.date).toLocaleString().split(",")[0]}
                  </span>
                  <span>
                    {new Date(order.date).toLocaleString().split(",")[1]}
                  </span>
                </td>

                <td className={classes.sizes}>
                  {order.cart && (
                    <>
                      1. <Link to={"/"}>{order.cart[0].product.name}</Link>{" "}
                      <br />
                      <p>
                        {" "}
                        Rozmiar: {order.cart[0].size}{" "}
                        {order.cart.length > 1 && (
                          <i className="fa-solid fa-angle-down "></i>
                        )}
                      </p>
                      <span> Ilość: {order.cart[0].quantity}</span>
                    </>
                  )}

                  <div>
                    <ul>
                      {order.cart &&
                        order.cart.map((item, i) => {
                          if (i > 0)
                            return (
                              <li
                                key={item.product._id}
                                style={{ borderTop: "2px solid black" }}
                              >
                                <span>{i + 1}. </span>
                                <Link to={`/sklep/product/${item.product._id}`}>
                                  {item.product.name}
                                </Link>{" "}
                                <br />
                                <span> Rozmiar: {item.size}</span>
                                <br />
                                <span> Ilość: {item.quantity}</span>
                              </li>
                            );
                        })}
                    </ul>
                  </div>
                </td>
                <td>{order.shipping}</td>
                <td>{order.orderPrice},00 zł</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderHistory;
