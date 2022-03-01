import styles from "./profile.module.css";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfile,
  editUserEmail,
  userIsAuth,
} from "../../store/actions/users.actions";
import { errorGlobal } from "../../store/actions";

import NewEmailPopUp from "./NewEmailPopUP";
import NewPasswordPopUp from "./NewPasswordPopUP";
const ProfileSettings = ({ users }) => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const openEmailModal = () => {
    setShowEmailModal(true);
  };
  const closeEmailModal = () => {
    setShowEmailModal(false);
  };
  const openPasswordModal = () => {
    setShowPasswordModal(true);
  };
  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const handleSubmit = (password) => {
    // password comesfrom NewEmailPopUP component
    const values = { password, newEmail: formikEmail.values.email };
    dispatch(editUserEmail(values));
  };
  // In case of success, i wanna close the modal, but only the one that is open
  useEffect(() => {
    if (showEmailModal === true) {
      closeEmailModal();
    }
    if (showPasswordModal === true) {
      closePasswordModal();
    }
  }, [notifications.success]);

  const formikNames = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: users.data.firstname,
      lastname: users.data.lastname,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(3, "Min 3 characters required")
        .max(20, "Max 20 characters allowed")
        .required("You need the firstname"),
      lastname: Yup.string()
        .min(3, "Min 3 characters required")
        .max(20, "Max 20 characters allowed")
        .required("You need the lastname"),
      //could use test here if the email is the same but i prefer to dispatch my errorGlobal toast a few lines below
    }),
    validateOnBlur: true,
    onSubmit: (values) => {
      if (
        values.firstname === users.data.firstname &&
        values.lastname === users.data.lastname
      ) {
        // i throw error if the email is the same, if not, i open modal to continue
        dispatch(errorGlobal("Musisz coś zmienić!"));
        return;
      }
      dispatch(editUserProfile(values));
    },
  });

  const formikEmail = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: users.data.email,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(6, "Min 6 characters required")
        .max(30, "Max 30 characters allowed")
        .required("You need an email")
        .email("Invalid email"),
    }),
    onSubmit: (values) => {
      if (values.email === users.data.email) {
        dispatch(errorGlobal("To już jest twój email!"));
      } else openEmailModal();
    },
  });

  const firstnameErr =
    formikNames.errors.firstname && formikNames.touched.firstname;
  const lastnameErr =
    formikNames.errors.lastname && formikNames.touched.lastname;
  const emailErr = formikEmail.errors.email && formikEmail.touched.email;

  const redInput = { border: "2px solid red" };
  return (
    <div className={styles.profileSettings}>
      <h1> Ustawienia konta Dynamiczne</h1>
      <form onSubmit={formikNames.handleSubmit}>
        <label>Wpisz swoje imię</label>
        <input
          style={firstnameErr && redInput}
          value={formikNames.values.firstname}
          onChange={formikNames.handleChange}
          onBlur={formikNames.handleBlur}
          name="firstname"
          type="firstname"
        />
        <span className={styles.invalid}>
          {firstnameErr && formikNames.errors.firstname}
        </span>
        <label>Wpisz swoje nazwisko</label>
        <input
          style={lastnameErr && redInput}
          value={formikNames.values.lastname}
          onChange={formikNames.handleChange}
          onBlur={formikNames.handleBlur}
          name="lastname"
          type="lastname"
        />
        <span className={styles.invalid}>
          {lastnameErr && formikNames.errors.lastname}
        </span>
        <button type="submit">Edytuj</button>
      </form>
      <form onSubmit={formikEmail.handleSubmit}>
        <label className={styles.emailLabel}>Zmień swój adres email</label>
        <input
          style={emailErr && redInput}
          value={formikEmail.values.email}
          onChange={formikEmail.handleChange}
          onBlur={formikEmail.handleBlur}
          name="email"
          type="email"
        />
        <span className={styles.invalid}>
          {emailErr && formikEmail.errors.email}
        </span>
        <button type="submit">Wyślij</button>
      </form>

      <NewEmailPopUp
        redInput={redInput}
        onHandleSubmit={handleSubmit}
        onHandleClose={closeEmailModal}
        onShow={showEmailModal}
      />
      <label className={styles.passwordLabel}>Zmień swoje hasło</label>
      <button onClick={openPasswordModal}>Zmień hasło</button>

      <NewPasswordPopUp
        onShow={showPasswordModal}
        onHandleClose={closePasswordModal}
      />
    </div>
  );
};

export default ProfileSettings;
