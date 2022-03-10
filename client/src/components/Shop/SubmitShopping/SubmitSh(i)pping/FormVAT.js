import styles from "../SubmitPage.module.css";

const FormVAT = ({ Form, formik }) => {
  return (
    <div className={styles.formVAT}>
      <Form.Group className="mb-3">
        <Form.Label>Nip</Form.Label>
        <Form.Control
          isInvalid={formik.errors.nipVAT && formik.touched.nipVAT}
          onChange={formik.handleChange}
          value={formik.values.nipVAT}
          type="text"
          id="nipVAT"
        />
        <Form.Control.Feedback type="invalid">
          Wypełnij to pole
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Firma lub imię i nazwisko</Form.Label>
        <Form.Control
          isInvalid={
            formik.errors.companyOrNameVAT && formik.touched.companyOrNameVAT
          }
          onChange={formik.handleChange}
          value={formik.values.companyOrNameVAT}
          type="text"
          id="companyOrNameVAT"
        />
        <Form.Control.Feedback type="invalid">
          Wypełnij to pole
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ulica i numer domu</Form.Label>
        <Form.Control
          isInvalid={formik.errors.addressVAT && formik.touched.addressVAT}
          onChange={formik.handleChange}
          value={formik.values.addressVAT}
          type="text"
          id="addressVAT"
        />
        <Form.Control.Feedback type="invalid">
          Wypełnij to pole
        </Form.Control.Feedback>
      </Form.Group>

      <div className={styles.rowInputs}>
        <Form.Group className="mb-3">
          <Form.Label>Kod pocztowy</Form.Label>
          <Form.Control
            isInvalid={
              formik.errors.postalcodeVAT && formik.touched.postalcodeVAT
            }
            onChange={formik.handleChange}
            value={formik.values.postalcodeVAT}
            type="text"
            id="postalcodeVAT"
          />
          <Form.Control.Feedback type="invalid">
            Wypełnij to pole
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Miasto</Form.Label>
          <Form.Control
            isInvalid={formik.errors.countryVAT && formik.touched.countryVAT}
            onChange={formik.handleChange}
            value={formik.values.countryVAT}
            type="text"
            id="countryVAT"
          />
          <Form.Control.Feedback type="invalid">
            Wypełnij to pole
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>
  );
};

export default FormVAT;
