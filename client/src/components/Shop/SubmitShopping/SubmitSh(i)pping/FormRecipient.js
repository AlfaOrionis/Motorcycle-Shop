import styles from "../SubmitPage.module.css";

const FormRecipient = ({
  Form,
  FormVAT,
  showVAT,
  onHandleStep,
  onSetShowVatHandler,
  formik,
}) => {
  return (
    <div className={styles.formContainer}>
      <div>
        <h1>Dane odbiorcy</h1>
        <button onClick={() => onHandleStep(-1)}>
          Wróć <i className="fa-solid fa-arrow-up-right-from-square" />
        </button>
      </div>

      <div className={styles.rowInputs}>
        <Form.Group className="mb-3">
          <Form.Label>Imię</Form.Label>
          <Form.Control
            isInvalid={formik.errors.firstname && formik.touched.firstname}
            onChange={formik.handleChange}
            value={formik.values.firstname}
            type="text"
            id="firstname"
          />
          <Form.Control.Feedback type="invalid">
            Wypełnij to pole
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            isInvalid={formik.errors.lastname && formik.touched.lastname}
            onChange={formik.handleChange}
            value={formik.values.lastname}
            type="text"
            id="lastname"
          />
          <Form.Control.Feedback type="invalid">
            Wypełnij to pole
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Ulica i numer domu</Form.Label>
        <Form.Control
          isInvalid={formik.errors.address && formik.touched.address}
          onChange={formik.handleChange}
          value={formik.values.address}
          id="address"
          type="text"
        />
        <Form.Control.Feedback type="invalid">
          Wypełnij to pole
        </Form.Control.Feedback>
      </Form.Group>

      <div className={styles.rowInputs}>
        <Form.Group className="mb-3">
          <Form.Label>Kod pocztowy</Form.Label>
          <Form.Control
            isInvalid={formik.errors.postalcode && formik.touched.postalcode}
            onChange={formik.handleChange}
            value={formik.values.postalcode}
            id="postalcode"
            type="text"
          />
          <Form.Control.Feedback type="invalid">
            Wypełnij to pole
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Miasto</Form.Label>
          <Form.Control
            isInvalid={formik.errors.country && formik.touched.country}
            onChange={formik.handleChange}
            value={formik.values.country}
            id="country"
            type="text"
          />
          <Form.Control.Feedback type="invalid">
            Wypełnij to pole
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Numer telefonu</Form.Label>
        <Form.Control
          isInvalid={formik.errors.telephone && formik.touched.telephone}
          onChange={formik.handleChange}
          value={formik.values.telephone}
          id="telephone"
          type="number"
        />

        <Form.Control.Feedback className="mb-3" type="invalid">
          Wypełnij to pole
        </Form.Control.Feedback>
        <Form.Text style={{ color: "rgba(30,30,30)" }}>
          <strong>Uwaga:</strong> Paczek nie wysyłamy poza granicę Polski
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          onChange={onSetShowVatHandler}
          checked={showVAT}
          type="checkbox"
          label="Chcę otrzymać fakturę VAT"
        />
      </Form.Group>

      {showVAT && <FormVAT Form={Form} formik={formik} />}

      <Form.Group className="mb-3">
        <Form.Label>Adres email</Form.Label>
        <Form.Control
          isInvalid={formik.errors.email && formik.touched.email}
          onChange={formik.handleChange}
          value={formik.values.email}
          id="email"
          type="email"
        />

        <Form.Control.Feedback type="invalid">
          Wypełnij to pole
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default FormRecipient;
