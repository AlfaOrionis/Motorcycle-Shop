import styles from "./ProductDetails.module.css";

import Description from "./Description";

import helmets_size_chart from "../../Images/ROZMIAR_KASKI.jpg";
import gloves_size_chart from "../../Images/ROZMIAR_REKAWICE.jpg";
import clothes_size_chart from "../../Images/ROZMIAR_CIUCHY.png";

import { Modal } from "react-bootstrap";
import { useState } from "react";

const SizeChart = ({ cat_name }) => {
  //Differentiate type of product
  const size_chart = () => {
    if (cat_name === "Gloves") return gloves_size_chart;
    if (cat_name === "Helmets") return helmets_size_chart;
    return clothes_size_chart;
  };

  //STATE
  const [show, setShow] = useState(false);

  const styleMix = {
    width: "95%",
    display: "block",
    margin: "10px auto",
    cursor: "pointer",
  };

  return (
    <>
      <Modal
        size="xl"
        className={styles.sizeChart}
        centered
        onHide={() => setShow(false)}
        show={show}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img src={size_chart()} alt="size_chart" />
        </Modal.Body>
      </Modal>
      <Description
        title={"Tabela rozmiarów"}
        description={
          <img
            style={styleMix}
            onClick={() => setShow(true)}
            src={size_chart()}
            alt="size_chart"
          />
        }
      />
    </>
  );
};

export default SizeChart;
