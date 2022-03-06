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
  //So this is the confusing part a little bit, if ModalOverlay for example is cart that is coming from behind the right side of screen, i want it to be in the DOM all the time, it needs to be behind the screen all the time, so when u click, its just coming into the screen by simply changing the position. THe backDrop on the other hand, needs to dissapear completly, althought i think i could animate it also but i will just get rid of it, thats why i render it conditionally, only if props.show is true. Its actually all just for animating the cart cuz i could get rid of it also, but then i cant animate it, i am aware that this is not the best way to do it, but hey it works!.
  return (
    <>
      {props.show &&
        ReactDOM.createPortal(
          <Backdrop show={props.show} onCloseModal={props.onCloseModal} />,
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
