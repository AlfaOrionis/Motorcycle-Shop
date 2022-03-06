import styles from "./ProductDetails.module.css";

const Description = ({ title, description }) => {
  return (
    <div className={styles.descriptionContainer}>
      <div>
        <h3>{title && title}</h3>
        <p>{description && description}</p>
      </div>
    </div>
  );
};

export default Description;
