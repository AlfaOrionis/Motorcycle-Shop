import styles from "../SubmitPage.module.css";

import { PayPalButton } from "react-paypal-button-v2";

const FormShipping = ({
  Form,
  cart,
  inpostBtn,
  inpostValue,
  shippingOption,
  onShippingOptionHandler,
}) => {
  //

  const shippingOptions = [
    { name: "Kurier", price: cart.cartPrice >= 500 ? 0 : 15 },
    { name: "Odbiór osobisty, płatność z góry", price: 0 },
    { name: "Paczkomat inpost", price: cart.cartPrice >= 500 ? 0 : 12 },
    {
      name: "Kurier za pobraniem | Płatność za pobraniem",
      price: cart.cartPrice >= 500 ? 0 : 15,
    },
    { name: "Odbiór osobisty | Płatność przy odbiorze", price: 0 },
  ];

  //PAYPAL PAYPAL

  const generateItems = () => {
    let items = cart.cart.map((item) => ({
      unit_amount: {
        currency_code: "USD",
        value: item.item.price,
      },
      description: `SIZE ${item.size}`,
      quantity: item.quantity,
      name: item.item.name,
    }));

    return items;
  };

  return (
    <div className={styles.shippingContainer}>
      {shippingOptions.map((option) => (
        <Form.Group key={option.name}>
          <Form.Check
            type="checkbox"
            checked={shippingOption.name === option.name ? true : false}
            value={option.name}
            id={option.name}
            label={option.name}
            onChange={(e) => {
              onShippingOptionHandler(option);

              if (e.target.value === "Paczkomat inpost") {
                inpostBtn.onclick();
              }
            }}
          />
          <Form.Label>{option.price + ",00 zł"}</Form.Label>
        </Form.Group>
      ))}
      {shippingOption &&
      shippingOption.name === "Paczkomat inpost" &&
      inpostValue.value ? (
        <div className={styles.packagePickUp}>
          <p>
            <strong>Odbiór w paczkomacie:</strong>
          </p>
          <p>{inpostValue.value}</p>
          <button onClick={() => inpostBtn.onclick()}>Zmień</button>
        </div>
      ) : null}

      <p>Dostawa: {shippingOption && shippingOption.price + ",00 zł"}</p>
      {shippingOption && shippingOption.name.includes("Odbiór osobisty") && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9420.015659238441!2d17.0292959!3d51.1076167!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc276820a1c17%3A0x768f65c91a44e8d7!2sBiedronka!5e1!3m2!1spl!2spl!4v1646755386166!5m2!1spl!2spl"
          width="100%"
          height="450"
          loading="lazy"
        />
      )}

      {/* <PayPalButton
        options={{
          clientId:
            "AVmmSMEOrySFYIiK5jwemEzNSMXpmrwaF9reG-JFdiljOihR7hE-2I2Qd9pKQ9zgsCJvlNbhQxqZtq0M",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "awd",
                amount: {
                  currency_code: "USD",
                  value: cart.cartPrice,
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: cart.cartPrice,
                    },
                  },
                },
                items: generateItems(),
              },
            ],
          });
        }}
        onSuccess={(details, data) => {
          console.log(details);
          console.log(data);
          alert("Transaction completed by " + details.payer.name.given_name);
        }}
      /> */}

      <input hidden id="inpostValue" />
    </div>
  );
};

export default FormShipping;
