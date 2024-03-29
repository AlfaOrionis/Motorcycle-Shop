import styles from "./auth.module.css";

import { useState, useEffect } from "react";

import Modal from "../../hoc/Modal";
import Loader from "../../utills/Loader";
import ForgotPasswordForm from "./ForgotPasswordForm";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useGoogleLogin, googleLogout } from "@react-oauth/google";

import { useDispatch, useSelector } from "react-redux";
import {
  userRegister,
  userSignIn,
  userSignInGoogle,
} from "../../store/actions/users.actions";

import googleIMG from "../../Images/google.png";

const Auth = ({ showAuth }) => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const [formType, setFormType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassModal, setShowResetPassModal] = useState(false);

  const [isVisable, setIsVisable] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Wpisz swój email")
        .email("Email jest nieprawidłowy"),
      password: Yup.string()
        .required("Wpisz swoje hasło")
        .min(6, "Twoje hasło napewno ma minimum 6 znaków!"),
    }),
    validateOnBlur: true,

    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  const handleResetPasswordModal = () => {
    setShowResetPassModal((prev) => !prev);
  };

  const handleSubmit = (values) => {
    setIsLoading(true);

    if (!formType) {
      console.log(values);
      dispatch(userRegister(values));
    } else {
      dispatch(userSignIn(values));
    }
  };

  const googleLogIn = useGoogleLogin({
    onSuccess: (codeResponse) => {
      dispatch(userSignInGoogle(codeResponse.access_token));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (notifications && notifications.success) {
      showAuth();
    }

    if (notifications && notifications.msg) {
      setIsLoading(false);
    }
  }, [notifications, showAuth]);

  return (
    <Modal show={showAuth} onCloseModal={showAuth}>
      {isLoading && <Loader side />}
      <div className={styles.authModal}>
        {!showResetPassModal && (
          <>
            <div className={styles.loginFormWrapper}>
              <h1>{formType ? "Zaloguj się" : "Zarejestruj się"} </h1>
              <button className={styles.googleLogin} onClick={googleLogIn}>
                <img alt="google" src={googleIMG} />
                Kontynuuj z google
              </button>
              <form onSubmit={formik.handleSubmit}>
                <label>Adres Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Adres email"
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
                <div>
                  <input
                    name="password"
                    placeholder="Hasło"
                    type={isVisable ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <i
                    onClick={() => setIsVisable((prev) => !prev)}
                    className="fa-solid fa-eye"
                  ></i>
                </div>
                <span className="invalid">
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </span>
                <div className={styles.passwordForget}>
                  <div>
                    <input type="checkbox" />
                    <span>Nie wylogowuj mnie</span>
                  </div>
                  <button type="button" onClick={handleResetPasswordModal}>
                    Nie pamiętam hasła
                  </button>
                </div>
                <button type="submit">
                  {formType ? "Zaloguj się" : "Zarejestruj się"}
                </button>
              </form>
            </div>

            <div className={styles.toggleText}>
              <span>
                {formType
                  ? "Jesteś nowym klientem? Poznajmy się lepiej"
                  : "Masz już konto?"}
              </span>
              <button onClick={() => setFormType((prevState) => !prevState)}>
                {formType ? "Załóż konto" : "Zaloguj się"}
              </button>
            </div>
            <button className={styles.close} onClick={showAuth}>
              X
            </button>
          </>
        )}

        {showResetPassModal && (
          <ForgotPasswordForm
            onhandleResetPasswordModal={handleResetPasswordModal}
          />
        )}
      </div>
    </Modal>
  );
};

export default Auth;
