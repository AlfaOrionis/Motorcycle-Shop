import styles from "./auth.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as actions from "../../store/actions/index";

const ForgotPassword = ({ onhandleResetPasswordModal }) => {
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/forgot_password", {
        email: emailValue,
      });
      console.log(response);
      dispatch(actions.successGlobal("Sprawdź swój adres email"));
    } catch (err) {
      console.log(err.response);
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
  return (
    <>
      <button onClick={onhandleResetPasswordModal}>
        <i className="fa-solid fa-angle-left " />
        Wróć do logowania
      </button>
      <div className={styles.loginFormWrapper}>
        <h1>Nie pamiętasz Hasła?</h1>
        <p>
          W przypadku problemów z logowaniem podaj adres e-mail używany na
          portalu. Wyślemy link do zmiany hasła.
        </p>
        <form onSubmit={submitHandler}>
          <label>Wpisz adres email</label>
          <input
            type="email"
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
            style={{ margin: "5px 0 20px 0" }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "red",
              marginBottom: "40px",
              color: "white",
            }}
          >
            Zresetuj hasło
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
