import styles from "../SubmitPage.module.css";

const OnSuccessPage = ({ Link }) => {
  return (
    <div className={styles.successPage}>
      <h1>Twoje zamówienie zostało złożone pomyślnie</h1>
      <i className="fa-solid fa-face-laugh-wink" />

      <Link to="/"> Wróć do sklepu</Link>
    </div>
  );
};

export default OnSuccessPage;
