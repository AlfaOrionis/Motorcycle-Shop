import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSignOut } from "../../../store/actions/users.actions";
import styles from "./header.module.css";

const TopHeader = (props) => {
  const userAuth = useSelector((state) => state.users.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className={styles.TopHeader}>
      <div className={styles.left}>
        <div className={styles.input}>
          <Link style={{ textDecoration: "none" }} to="/">
            <h1>MotorcycleShop</h1>
          </Link>
          <input placeholder="Czego szukasz?" />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div className={styles.right}>
        {userAuth ? (
          <Link to="/profile">
            <i className="fa-solid fa-user" />
          </Link>
        ) : (
          <button onClick={props.showAuth}>
            <i className="fa-solid fa-user" />
          </button>
        )}

        <button onClick={() => props.onHandleShow(true)}>
          <i className="fa-solid fa-cart-shopping" />
        </button>
        {userAuth && (
          <button
            onClick={() => {
              dispatch(userSignOut());
              navigate("/");
            }}
          >
            <i className="fa-solid fa-power-off" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopHeader;
