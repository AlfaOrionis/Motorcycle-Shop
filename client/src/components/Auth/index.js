import { useState } from "react";
import styles from "./auth.module.css";

import Modal from "../utills/Modal";

import { useFormik } from "formik";
import * as Yup from "yup";
const Auth = (props) => {
  const [formType, setFormType] = useState(false);

  return (
    <Modal onCloseModal={props.onOpenAuth}>
      <div className={styles.authModal}>
        <div className={styles.loginFormWrapper}>
          <h1>{formType ? "Zaloguj się" : "Zarejestruj się"}</h1>
          <form>
            <label>Adres Email</label>
            <input type="text" />
            <label>Hasło</label>
            <input type="text" />
            <button type="submit">
              {formType ? "Zaloguj się" : "Zarejestruj się"}
            </button>
          </form>
        </div>
        <div>
          <span>
            {formType
              ? "Jesteś nowym klientem? Poznajmy się lepiej"
              : "Kliknij zarejestruj się i załóż konto!"}
          </span>
          <button onClick={() => setFormType((prevState) => !prevState)}>
            {formType ? "Załóż konto" : "Zaloguj się"}
          </button>
        </div>
        <button className={styles.close} onClick={props.onOpenAuth}>
          X
        </button>
      </div>
    </Modal>
  );
};

export default Auth;
