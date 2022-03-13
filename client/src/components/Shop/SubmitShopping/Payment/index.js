import styles from "../SubmitPage.module.css";
import { Table } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { userCreateOrder } from "../../../../store/actions/users.actions";
const Payment = ({
  Link,
  cart,
  shippingOption,
  formik,
  showVAT,
  inpostValue,
  navigate,
  dispatch,
}) => {
  const f = formik.values;
  console.log(shippingOption);
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

  //PAYPAL SUCCESS SCENARIO

  //I will do a lot of things in this function, its purpouse is to preapre and structurize the data for the backend, for the order.model, maybe i could handle it on redux, but for me it doesnt make any diffrence cuz i know what i am doing.

  const successHandler = (details, data) => {
    // Thats how the cart items will look in order model, no need for a whole item, an id is enough so i can populate
    const orderCart = () => {
      return cart.cart.map((item) => ({
        product: item.item._id,
        quantity: item.quantity,
        size: item.size,
        totalPrice: item.totalPrice,
      }));
    };
    // I send the data to redux where i will send request to create an order in database, i also send the paypal data
    // In 99% cases the filled VAT values will indicate that the user wants vat facture, but its possible, that the user filled the vat form, and then actually changed his mind and close it, and the values will stay, i am aware of that so i will also make a VAT_DATA object, that will be just empty if the user CLOSED (!showVAT) the vat Form, this way i am sure what he actually wants

    // i will split the formik values now into 3 parts: VAT PART, RECIPIENT INFO PART, SHIPPING PART
    const VAT_DATA = showVAT
      ? {
          companyOrNameVAT: f.companyOrNameVAT,
          cityVAT: f.cityVAT,
          nipVAT: f.nipVAT,
          postalcodeVAT: f.postalcodeVAT,
        }
      : "";
    // I will also destructure the recipient info and get rid of the vat values cuz i dont need it here. Well i could just make 2 formiks instead of 1, and 1 would be just for vat values, but thats also the way i can handle this
    const recipientInfo = {
      firstname: f.firstname,
      lastname: f.lastname,
      email: f.email,
      telephone: f.telephone,
    };
    const shippingInfo = {
      address: f.address,
      city: f.city,
      postalcode: f.postalcode,
      inpostAddress:
        shippingOption.name === "Paczkomat inpost" ? inpostValue.value : "",
    };

    dispatch(
      userCreateOrder({
        recipientInfo,
        VAT_DATA,
        orderPrice: cart.cartPrice + shippingOption.price,
        cart: orderCart(),
        shipping: shippingOption.name,
        shippingInfo,
        ppData: { ...details },
      })
    );
    //And navigate to success page
    navigate("/koszyk/podsumowanie-sukces");
  };

  return (
    <div className={styles.paymentContainer}>
      <div>
        <h2>Podsumowanie zamówienia</h2>
        <Link to="/koszyk/podsumowanie-dostawa">
          Wróć <i className="fa-solid fa-arrow-up-right-from-square" />
        </Link>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Rozmiar</th>
            <th>Ilość</th>
            <th>Cena </th>
          </tr>
        </thead>

        <tbody>
          {cart &&
            cart.cart.length > 0 &&
            cart.cart.map((item) => (
              <tr key={`${item.size} ${item.item._id}`}>
                <td>{item.item.name}</td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>{item.totalPrice},00 zł</td>
              </tr>
            ))}

          <tr>
            <td>Dostawa : {shippingOption.name}</td>
            <td></td>
            <td>1</td>
            <td>{shippingOption.price},00 zł</td>
          </tr>
        </tbody>
      </Table>
      <div className={styles.paymentTotalPrice}>
        <p>Razem: {cart.cartPrice + shippingOption.price},00 zł </p>
      </div>

      <div className={styles.shippingInfo}>
        <h3>Sposób dostawy</h3>
        <p>{shippingOption.name}</p>
        {inpostValue && <p>{inpostValue.value}</p>}
      </div>

      <div className={styles.paymentRecipientInfo}>
        <h3>Dane odbiorcy:</h3>
        <p>{`${f.firstname} ${f.lastname}`}</p>
        <p>{f.address}</p>
        <p>{`${f.country} ${f.postalcode}`}</p>
        <p>
          Kurierowi zostanie przekazany numer telefonu:
          <strong> {f.telephone}</strong>
        </p>
        <p>
          Informacje o postępach zamówienia wyślemy na adres:
          <strong> {f.email}</strong>
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <PayPalButton
          options={{
            clientId:
              "AVmmSMEOrySFYIiK5jwemEzNSMXpmrwaF9reG-JFdiljOihR7hE-2I2Qd9pKQ9zgsCJvlNbhQxqZtq0M",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Opis opis opis",
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
          onSuccess={(details, data) => successHandler(details, data)}
        />
      </div>
    </div>
  );
};

export default Payment;
