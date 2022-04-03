import Cart from "../Cart/Cart";
import styles from "./SubmitPage.module.css";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import SubmitShipping from "./SubmitSh(i)pping";
import Payment from "./Payment";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { errorGlobal } from "../../../store/actions";
import OnSuccessPage from "./Payment/OnSuccessPage";

const inpostInput = document.getElementById("inpostValue");

const SubmitShopping = ({ cart }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //STATE
  const [inpostBtn, setInpostBtn] = useState("");
  const [inpostValue, setInpostValue] = useState("");

  const [showVAT, setShowVAT] = useState(false);
  const [shippingOption, setShippingOption] = useState("");

  const step =
    (location.pathname === "/koszyk" && "0") ||
    (location.pathname === "/koszyk/podsumowanie-dostawa" && 1) ||
    (location.pathname === "/koszyk/podsumowanie-platnosci" && 2) ||
    (location.pathname === "/koszyk/podsumowanie-sukces" && 3);

  //USE EFFECT

  useEffect(() => {
    //THis is the hidden button that opens the inpost Modal, i will use its function in FormShipping
    const btn = document.getElementById("openModalBtn");
    //This is input holding the inpost data like adress etc

    setInpostValue(inpostInput);
    setInpostBtn(btn);
  }, []);

  useEffect(() => {
    document.title =
      (step == 0 && "Koszyk") ||
      (step == 1 && "Dostawa") ||
      (step == 2 && "Płatność") ||
      (step == 3 && "Zamówienie złożone pomyślnie");
    window.scrollTo(0, 0);
  }, [step]);

  // FORMIK
  const vatValidation = showVAT
    ? {
        nipVAT: Yup.string().required(),
        companyOrNameVAT: Yup.string().required(),
        addressVAT: Yup.string().required(),
        postalcodeVAT: Yup.string().required(),
        cityVAT: Yup.string().required(),
      }
    : null;

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      postalcode: "",
      city: "",
      telephone: "",
      email: "",
      statue: false,
      nipVAT: "",
      companyOrNameVAT: "",
      addressVAT: "",
      postalcodeVAT: "",
      cityVAT: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      address: Yup.string().required(),
      postalcode: Yup.string().required(),
      city: Yup.string().required(),
      telephone: Yup.number().required(),
      email: Yup.string().required(),
      statue: Yup.boolean().isTrue("Musisz zaakceptować regulamin"),
      ...vatValidation,
    }),
    validateOnChange: true,

    onSubmit: (values) => {
      console.log(values);
      if (!shippingOption) {
        dispatch(errorGlobal("Wybierz opcję dostawy!"));
        return;
      }
      navigate("/koszyk/podsumowanie-platnosci");
    },
  });

  const shippingOptionHandler = (value) => {
    setShippingOption(value);
  };
  const setShowVatHandler = () => {
    setShowVAT((prev) => !prev);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.step}>
        <div style={{ width: "120%", position: "relative", left: "-10%" }}>
          <Stepper alternativeLabel activeStep={step * 1}>
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

      <Routes>
        <Route path="/" element={<Cart site />} />
        <Route
          path="/podsumowanie-dostawa"
          element={
            <SubmitShipping
              onShippingOptionHandler={shippingOptionHandler}
              onSetShowVatHandler={setShowVatHandler}
              shippingOption={shippingOption}
              inpostBtn={inpostBtn}
              inpostValue={inpostValue}
              navigate={navigate}
              showVAT={showVAT}
              cart={cart}
              formik={formik}
              Link={Link}
            />
          }
        />
        <Route
          path="/podsumowanie-platnosci"
          element={
            <Payment
              cart={cart}
              Link={Link}
              navigate={navigate}
              dispatch={dispatch}
              shippingOption={shippingOption}
              formik={formik}
              showVAT={showVAT}
              inpostValue={inpostValue}
            />
          }
        />

        <Route
          path="/podsumowanie-sukces"
          element={<OnSuccessPage Link={Link} />}
        />
      </Routes>
    </div>
  );
};

export default SubmitShopping;
