import { useState, useEffect } from "react";
import styles from "./auth.module.css";

import Modal from "../../utills/Modal";
import Loader from "../../utills/Loader";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { userRegister, userSignIn } from "../../store/actions/users.actions";

const Auth = (props) => {
  const [formType, setFormType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Wpisz swój email")
        .email("Email jest nieprawidłowy"),
      password: Yup.string().required("Wpisz swoje hasło"),
    }),
    validateOnBlur: true,

    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setIsLoading(true);

    if (!formType) {
      console.log(values);
      dispatch(userRegister(values));
    } else {
      dispatch(userSignIn(values));
    }
  };

  const { onOpenAuth } = props;
  useEffect(() => {
    if (notifications && notifications.success) {
      onOpenAuth();
    }

    if (notifications && notifications.msg) {
      setIsLoading(false);
    }
  }, [notifications, onOpenAuth]);

  //So at this point i was wondering if i should make my own validation, but i already did that on my ToDoList with useRef, i will use some library this time
  return (
    <Modal onCloseModal={onOpenAuth}>
      <div className={styles.authModal}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.loginFormWrapper}>
            <h1>{formType ? "Zaloguj się" : "Zarejestruj się"}</h1>
            <form onSubmit={formik.handleSubmit}>
              <label>Adres Email</label>
              <input
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              <span className="invalid">
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </span>

              <label>Hasło</label>
              <input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span className="invalid">
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </span>
              <button type="submit">
                {formType ? "Zaloguj się" : "Zarejestruj się"}
              </button>
            </form>
          </div>
        )}
        <div>
          <span>
            {formType
              ? "Jesteś nowym klientem? Poznajmy się lepiej"
              : "Masz już konto?"}
          </span>
          <button onClick={() => setFormType((prevState) => !prevState)}>
            {formType ? "Załóż konto" : "Zaloguj się"}
          </button>
        </div>
        <button className={styles.close} onClick={onOpenAuth}>
          X
        </button>
      </div>
    </Modal>
  );
};

export default Auth;
