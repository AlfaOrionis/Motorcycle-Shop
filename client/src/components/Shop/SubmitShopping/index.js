import Cart from "../Cart/Cart";
import styles from "./SubmitPage.module.css";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import SubmitShipping from "./SubmitSh(i)pping";

const SubmitShopping = ({ cart }) => {
  //STATE
  const [step, setStep] = useState(0);

  //USE EFFECT

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleStep = (value) => {
    setStep((prev) => prev + value);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.step}>
        <div style={{ width: "120%", position: "relative", left: "-10%" }}>
          <Stepper alternativeLabel activeStep={step}>
            <Step>
              <StepLabel>Koszyk</StepLabel>
            </Step>
            <Step>
              <StepLabel>Dostawa i płatność</StepLabel>
            </Step>
            <Step>
              <StepLabel>Podsumowanie</StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>

      {step === 0 && <Cart site onHandleStep={handleStep} />}
      {step === 1 && <SubmitShipping cart={cart} onHandleStep={handleStep} />}
    </div>
  );
};

export default SubmitShopping;
