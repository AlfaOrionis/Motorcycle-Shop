import { Form, Modal, Button } from "react-bootstrap";
import FormVAT from "./FormVAT";
import { useEffect, useState } from "react";
import FormShipping from "./FormShipping";
import FormShippingSummary from "./FormShippingSummary";
import FormRecipient from "./FormRecipient";

const SubmitShipping = ({
  cart,
  Link,
  formik,
  showVAT,
  inpostValue,
  inpostBtn,
  navigate,
  shippingOption,
  onShippingOptionHandler,
  onSetShowVatHandler,
}) => {
  return (
    <>
      <FormRecipient
        Form={Form}
        FormVAT={FormVAT}
        showVAT={showVAT}
        formik={formik}
        Link={Link}
        onSetShowVatHandler={onSetShowVatHandler}
      />

      <FormShipping
        Form={Form}
        cart={cart}
        inpostBtn={inpostBtn}
        inpostValue={inpostValue}
        shippingOption={shippingOption}
        onShippingOptionHandler={onShippingOptionHandler}
      />
      <FormShippingSummary
        formik={formik}
        Button={Button}
        Form={Form}
        navigate={navigate}
        totalPrice={
          cart.cartPrice + (shippingOption ? shippingOption.price : 0)
        }
      />
    </>
  );
};

export default SubmitShipping;
