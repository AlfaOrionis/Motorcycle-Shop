import { useState } from "react";
import styles from "./NewsLetter.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { successGlobal, errorGlobal } from "../store/actions/index";
const NewsLetterBanner = () => {
  const dispatch = useDispatch();
  const [valueEmail, setvalueEmail] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTouched(true);

    if (!isAccepted) return;

    try {
      await axios.post("/api/users/news_letter", {
        email: valueEmail,
      });
      dispatch(successGlobal("Sprawdź swoją skrzynkę odbiorczą"));
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));
    }
  };
  return (
    <div className={styles.newsLetter}>
      <span>Newsletter</span>
      <p> Bądź na bieżąco z nowościami w MotorcycleShop!</p>
      <form onSubmit={handleSubmit}>
        <input
          value={valueEmail}
          onChange={(e) => {
            setvalueEmail(e.target.value);
          }}
          type="email"
          placeholder="Podaj adres email"
        />
        <button>Zapisz się</button>
      </form>
      <div className={styles.statue}>
        <input
          type="checkbox"
          value={isAccepted}
          onChange={() => setIsAccepted((prev) => !prev)}
        />
        <div>
          <span className={styles.statueSpan}>
            Oświadczam, że zapoznałam/-em się z Regulaminem portalu Rossmann.pl,
            zrozumiałam/-em go i zobowiązuję się przestrzegać.
          </span>
          <span className="invalid">
            {!isAccepted && isTouched && "Pole wymagane!"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterBanner;
