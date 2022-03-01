import styles from "./auth.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AccountVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [verificationResponse, setVerificationResponse] = useState("");

  const theParam = location.search.split("=");
  const isValidParam = theParam[0] === "?t";
  const token = theParam[1];

  useEffect(async () => {
    //if something is clearly wrong with the params, i wont even bother sending request
    if (!isValidParam || !token) {
      navigate("/");
    } else {
      try {
        await axios.get(`/api/users/verify?validation=${token}`);
        setVerificationResponse("Success");
      } catch (err) {
        console.log(err.response.data);
        //If its 400 it means he is already verified, and thats ok, but if its !== 400 he was probably messing with the token
        if (err.response.data.statusCode !== 400) {
          setVerificationResponse("Error");
        } else {
          setVerificationResponse("AlreadyVerified");
        }
      }
    }
  }, []);

  if (verificationResponse === "Success") {
    return (
      <div className={styles.AccountVerification}>
        <i className="fa-solid fa-circle-check"></i>
        <h2>Twoje konto jest już aktywne!</h2>
        <p>
          Dołącz do klubu zakute łby i programu ostra jazda aby zyskać ostre
          zniżki i specjalnie przygotowane rabaty dla naszych klientów!
        </p>
      </div>
    );
  } else if (verificationResponse === "Error") {
    return (
      <div className={styles.AccountVerification}>
        <i class="fa-solid fa-cloud-moon"></i>
        <h2>Twój link aktywacyjny wygasł</h2>
        <p>Prosimy o ponowne wysłanie linku aktywacyjnego lub rejestrację</p>
      </div>
    );
  } else if (verificationResponse === "AlreadyVerified") {
    return (
      <div className={styles.AccountVerification}>
        <i class="fa-solid fa-cloud-moon"></i>
        <h2>Twoje konto zostało już zweryfikowane!</h2>
        <p>
          Twoje konto zostało już wcześniej zweryfikowane, lub kliknąłeś w
          przestarzały link, w takim wypadku wyślij email weryfikacyjny jeszcze
          raz.
        </p>
      </div>
    );
  } else {
    // This case means redirecting to "/", so i return just an empty div for that short moment
    return <div className={styles.AccountVerification}></div>;
  }
};

export default AccountVerification;
