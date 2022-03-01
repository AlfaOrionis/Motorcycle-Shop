import styles from "./auth.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { successGlobal, errorGlobal } from "../../store/actions/index";

const ResetPassword = () => {
  //HOOKS
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //STATE
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const [isInvalidPassRepeat, setIsInvalidPassRepeat] = useState(false);

  //PARAMS
  const theParam = location.search.split("=");
  const isValidParam = theParam[0] === "?t";
  const token = theParam[1];

  //USE EFFECT
  useEffect(() => {
    if (!isValidParam || !token) {
      navigate("/", { replace: true });
    }
  }, []);

  //REF
  const passRef = useRef();
  const repeatPassRef = useRef();

  //SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    const passValue = passRef.current.value;
    const repeatPassValue = repeatPassRef.current.value;

    //VALIDATION

    if (!isValidParam || !token) {
      navigate("/", { replace: true });
    }

    if (passValue.length < 6) {
      setIsInvalidPass(true);
      return;
    }

    if (repeatPassValue !== passValue) {
      setIsInvalidPassRepeat(true);
      return;
    }

    //ACTION

    try {
      await axios.patch("/api/users/reset_password", {
        token: token,
        newPassword: passValue,
      });
      dispatch(successGlobal("Twoje hasło zostało zmienione"));
      navigate("/", { replace: true });
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));
    }
  };

  if (!isValidParam || !token) {
    //empty div if something is wrong
    return <div className={styles.AccountVerification}></div>;
  } else
    return (
      <div className={styles.ResetPasswordContainer}>
        <h1>Ustal nowe hasło</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" id="newPassword">
            <Form.Label htmlFor="newPassword">Twoje nowe hasło</Form.Label>
            <Form.Control
              ref={passRef}
              onChange={() => {
                if (passRef.current.value.length >= 6) {
                  setIsInvalidPass(false);
                }
              }}
              isInvalid={isInvalidPass}
              type="password"
              placeholder="Nowe hasło"
              id="password"
            />
            <Form.Control.Feedback type="invalid">
              Hasło musi mieć minimum 6 znaków
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" id="RepeatNewPassword">
            <Form.Label htmlFor="RepeatNewPassword">
              Powtórz nowe hasło
            </Form.Label>
            <Form.Control
              ref={repeatPassRef}
              isInvalid={isInvalidPassRepeat}
              onChange={() => {
                if (repeatPassRef.current.value === passRef.current.value) {
                  setIsInvalidPassRepeat(false);
                }
              }}
              type="password"
              placeholder="Powtórz nowe hasło"
              id="password"
            />
            <Form.Control.Feedback type="invalid">
              Hasła muszą być takie same!
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Zmień hasło</Button>
        </Form>
      </div>
    );
};

export default ResetPassword;
