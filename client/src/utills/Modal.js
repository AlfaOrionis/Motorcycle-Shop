import React from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";

export const Backdrop = (props) => {
  return (
    <div className={styles.Background} onClick={props.onCloseModal}>
      {props.children}
    </div>
  );
};

const ModalOverlay = (props) => {
  return <>{props.children}</>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Modal;
