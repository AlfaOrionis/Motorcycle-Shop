import styles from "./profile.module.css";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  editUserProfile,
  editUserEmail,
} from "../../store/actions/users.actions";
import { errorGlobal } from "../../store/actions";

import NewEmailPopUp from "./NewEmailPopUP";
const ProfileSettings = ({ users }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (password) => {
    // password comesfrom NewEmailPopUP component
    const values = { password, newEmail: formikEmail.values.email };
    dispatch(editUserEmail(values));
  };

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
      } else handleOpen();
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
        <button>Wyślij</button>
      </form>

      <NewEmailPopUp
        redInput={redInput}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        show={show}
      />
    </div>
  );
};

export default ProfileSettings;
