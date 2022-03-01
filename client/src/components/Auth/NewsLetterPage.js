import styles from "./auth.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const NewsLetterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [verificationResponse, setVerificationResponse] = useState("");

  const theParam = location.search.split("=");
  const isValidParam = theParam[0] === "?t";
  const token = theParam[1];

  useEffect(async () => {
    if (!isValidParam || !token) {
      navigate("/");
    } else {
      try {
        await axios.post("/api/users/news_letter_sign_up", { token: token });
        setVerificationResponse("Success");
      } catch (err) {
        console.log(err.response.data);
        setVerificationResponse("Error");
      }
    }
  }, []);

  if (verificationResponse === "Success") {
    return (
      <div className={styles.AccountVerification}>
        <i className="fa-solid fa-circle-check"></i>
        <h2> LUBISZ BYĆ NA BIEŻĄCO?</h2>
        <p>
          Wszystko o motocyklowych trendach i promocjach zawsze na Twojej
          skrzynce. Odkrywaj najlepsze ceny, nowinki i akcje specjalne i
          korzystaj!
        </p>
      </div>
    );
  } else if (verificationResponse === "Error") {
    return (
      <div className={styles.AccountVerification}>
        <i class="fa-solid fa-cloud-moon"></i>
        <h2>Spokojnie, zostałeś już zapisany!</h2>
        <p>
          Twoje konto prawdopodobnie zostało już wcześniej zapisane, lub
          kliknąłeś w przestarzały link. Upewnij się że kliknąłeś w świeży link
          lub zapisz się jeszcze raz.
        </p>
      </div>
    );
  } else {
    // This case means redirecting to "/" or loading, so i return just an empty div for that short moment
    return <div className={styles.AccountVerification}></div>;
  }
};

export default NewsLetterPage;
