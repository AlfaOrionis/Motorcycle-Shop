import styles from "../SubmitPage.module.css";

const FormShippingSummary = ({
  Form,
  Button,
  formik,
  navigate,
  totalPrice,
  onHandleStep,
}) => {
  const btnSize = window.innerWidth <= 480 ? "sm" : "md";

  return (
    <>
      <div className={styles.summaryShippingContainer}>
        <Form.Group>
          <Form.Check
            isInvalid={formik.errors.statue && formik.touched.statue}
            onChange={formik.handleChange}
            value={formik.values.statue}
            id="statue"
            checked={formik.values.statue}
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
              onClick={() => navigate("/koszyk")}
              variant="warning"
              size={btnSize}
            >
              Wróć do koszyka
            </Button>
            <Button onClick={formik.handleSubmit} size={btnSize}>
              Do podsumowania
            </Button>
          </div>
          <div>
            <p>
              W sumie: <span>{totalPrice + ",00 zł"} </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormShippingSummary;
