import styles from "./profile.module.css";
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getAuthHeader } from "../../utills/tolls";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import Loader from "../../utills/Loader";

const NewPasswordPopUp = ({ onShow, onHandleClose }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [isVisable1, setIsVisable1] = useState(false);
  const [isVisable2, setIsVisable2] = useState(false);
  const [isVisable3, setIsVisable3] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },

    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required("Wpisz swoje hasło")
        .min(6, "Twoje hasło napewno ma minimum 6 znaków!"),
      newPassword: Yup.string()
        .required("Wpisz swoje hasło")
        .min(6, "Twoje nowe hasło musi mieć minimum 6 znaków!"),
      repeatNewPassword: Yup.string().test(
        (value) => value === formik.values.newPassword
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        console.log(values);
        await axios.patch(
          "/api/users/password",
          {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
          getAuthHeader()
        );
        dispatch(actions.successGlobal("Hasło zostało zmienione"));

        resetForm();
        setLoading(false);
      } catch (err) {
        dispatch(actions.errorGlobal(err.response.data.message));
        setLoading(false);
      }
    },
  });

  const HandleClose = () => {
    onHandleClose();
    //I will clear the form also after closing the modal, so the password is safe and u dont start with all the errors from before
    formik.resetForm();
  };

  return (
    <Modal
      className={styles.newPasswordModal}
      size="md"
      centered
      onHide={HandleClose}
      show={onShow}
    >
      {loading && <Loader side />}
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <h2>Zmień swoje hasło</h2>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" id="currentPassword">
            <Form.Label htmlFor="currentPassword">Obecne hasło</Form.Label>

            <Form.Control
              isInvalid={
                formik.errors.currentPassword && formik.touched.currentPassword
              }
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
              type={isVisable1 ? "text" : "password"}
              placeholder="Bieżące hasło"
              id="currentPassword"
            ></Form.Control>

            <Form.Control.Feedback type="invalid">
              {formik.errors.currentPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" id="newPassword">
            <Form.Label htmlFor="newPassword">Nowe hasło</Form.Label>

            <Form.Control
              isInvalid={
                formik.errors.newPassword && formik.touched.newPassword
              }
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              placeholder="Nowe hasło"
              type={isVisable2 ? "text" : "password"}
              id="newPassword"
            ></Form.Control>

            <Form.Control.Feedback type="invalid">
              {formik.errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" id="repeatNewPassword">
            <Form.Label htmlFor="repeatNewPassword">
              Potwierdź nowe hasło
            </Form.Label>

            <Form.Control
              isInvalid={
                formik.errors.repeatNewPassword &&
                formik.touched.repeatNewPassword
              }
              onChange={formik.handleChange}
              value={formik.values.repeatNewPassword}
              placeholder="Potwierdź nowe hasło"
              type={isVisable3 ? "text" : "password"}
              id="repeatNewPassword"
            ></Form.Control>

            <Form.Control.Feedback type="invalid">
              {formik.errors.repeatNewPassword && "Hasła nie są takie same!"}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={HandleClose} variant="secondary">
            Anuluj
          </Button>
          <Button type="submit" variant="primary">
            Gotowe
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewPasswordPopUp;
