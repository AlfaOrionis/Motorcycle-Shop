import { Modal, Button, Form } from "react-bootstrap";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewEmailPopUp = ({ handleClose, show, redInput, handleSubmit }) => {
  const [validPass, setValidPass] = useState(true);
  const passRef = useRef();
  // a bit of my own validation, i tried to not overdo
  return (
    <Modal size="md" centered onHide={handleClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Wprowadź obecne hasło</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          style={!validPass ? redInput : null}
          onChange={(event) => {
            if (event.target.value.length >= 6) setValidPass(true);
          }}
          ref={passRef}
          size="md"
          type="password"
          aria-describedby="passwordHelpBlock"
        />
        {!validPass && (
          <Form.Text id="passwordHelpBlock" style={{ color: "red" }}>
            Your password must be atleast 6 characters.
          </Form.Text>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            if (passRef.current.value.length < 6) {
              setValidPass(false);
            } else handleSubmit(passRef.current.value);
          }}
        >
          Gotowe
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEmailPopUp;
