import { Form, Modal, Button } from "react-bootstrap";
import FormVAT from "./FormVAT";
import { useEffect, useState } from "react";
import FormShipping from "./FormShipping";
import FormShippingSummary from "./FormShippingSummary";
import FormRecipient from "./FormRecipient";
import * as Yup from "yup";
import { useFormik } from "formik";
const SubmitShipping = ({ cart, onHandleStep }) => {
  //STATE

  const [showVAT, setShowVAT] = useState(false);
  const [shippingOption, setShippingOption] = useState("");
  const [showInpost, setShowInpost] = useState(false);
  const [inpostBtn, setInpostBtn] = useState("");
  const [inpostValue, setInpostValue] = useState("");

  //USE EFFECT

  useEffect(() => {
    //THis is the hidden button that opens the inpost Modal, i will use its function in FormShipping
    const btn = document.getElementById("openModalBtn");

    //This is input holding the inpost data like adress etc
    const inpostInput = document.getElementById("inpostValue");
    console.log("POBIERANIE");

    setInpostValue(inpostInput);
    setInpostBtn(btn);
  }, []);

  //FORMIK

  const vatValidation = showVAT
    ? {
        nipVAT: Yup.string().required(),
        companyOrNameVAT: Yup.string().required(),
        addressVAT: Yup.string().required(),
        postalcodeVAT: Yup.string().required(),
        countryVAT: Yup.string().required(),
      }
    : null;

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      postalcode: "",
      country: "",
      telephone: "",
      email: "",
      statue: false,
      nipVAT: "",
      companyOrNameVAT: "",
      addressVAT: "",
      postalcodeVAT: "",
      countryVAT: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      address: Yup.string().required(),
      postalcode: Yup.string().required(),
      country: Yup.string().required(),
      telephone: Yup.number().required(),
      email: Yup.string().required(),
      statue: Yup.boolean().isTrue("Musisz zaakceptować regulamin"),
      ...vatValidation,
    }),
    validateOnChange: true,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  //ACTION

  const shippingOptionHandler = (value) => {
    setShippingOption(value);
  };
  const showInpostHandler = () => {
    setShowInpost((prev) => !prev);
  };
  const setShowVatHandler = () => {
    setShowVAT((prev) => !prev);
  };

  return (
    <>
      <FormRecipient
        Form={Form}
        FormVAT={FormVAT}
        showVAT={showVAT}
        formik={formik}
        onHandleStep={onHandleStep}
        onSetShowVatHandler={setShowVatHandler}
      />

      <FormShipping
        Form={Form}
        Modal={Modal}
        cart={cart}
        inpostBtn={inpostBtn}
        inpostValue={inpostValue}
        shippingOption={shippingOption}
        onShippingOptionHandler={shippingOptionHandler}
        showInpost={showInpost}
        onShowInpostHandler={showInpostHandler}
      />
      <FormShippingSummary
        formik={formik}
        Button={Button}
        Form={Form}
        totalPrice={
          cart.cartPrice + (shippingOption ? shippingOption.price : 0)
        }
        onHandleStep={onHandleStep}
      />
    </>
  );
};

export default SubmitShipping;
