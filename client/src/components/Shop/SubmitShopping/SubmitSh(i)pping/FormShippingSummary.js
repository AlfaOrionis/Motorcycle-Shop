import styles from "../SubmitPage.module.css";

const FormShippingSummary = ({
  Form,
  Button,
  formik,
  totalPrice,
  onHandleStep,
}) => {
  return (
    <>
      <div className={styles.summaryShippingContainer}>
        <Form.Group>
          <Form.Check
            isInvalid={formik.errors.statue && formik.touched.statue}
            onChange={formik.handleChange}
            value={formik.values.statue}
            id="statue"
            type="checkbox"
            style={{ fontSize: "14px" }}
            label="  Wyrażam zgodę na przetwarzanie podanych przeze mnie danych osobowych
            w celu realizacji zamówienia i akceptuję regulamin sklepu oraz
            regulamin dokonywania płatności w Serwisie Przelewy24"
          />
        </Form.Group>
      </div>

      <div className={styles.summaryShippingContainer}>
        <div className={styles.summaryShipping}>
          <div>
            <Button
              onClick={() => onHandleStep(-1)}
              variant="warning"
              size="lg"
            >
              Wróć do koszyka
            </Button>
          </div>
          <div>
            <div>
              <p>
                W sumie: <span>{totalPrice + ",00 zł"} </span>
              </p>
            </div>
            <Button onClick={formik.handleSubmit} size="lg">
              Do podsumowania
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormShippingSummary;
