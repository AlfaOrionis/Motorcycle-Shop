import { toast } from "react-toastify";
import cookie from "react-cookies";
import imageNotAvble from "../Images/sorry-image-not-available.jpg";

export const showToast = (type, msg) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      break;
    case "ERROR":
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;

    default:
      return false;
  }
};

export const getTokenCookie = () => cookie.load("x-access-token");
export const removeCookie = () =>
  cookie.remove("x-access-token", { path: "/" });

export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};

export const imageCheck = (prod) => {
  if (prod.images && prod.images.length > 0) {
    return prod.images[0].url;
  } else return imageNotAvble;
};

export const getProperties = (properties) => {
  //Exctracting the string from the array
  const propExtract = properties[0];
  //Splitting the string for a properties and getting aray of properties from that
  const ArrayOfProperties = propExtract.split("|");

  //h3 is property and p is value of that property
  const readyToDisplay = ArrayOfProperties.map((prop) => {
    return (
      <li>
        <h3>{prop.split(":")[0]}</h3>
        <p>{prop.split(":")[1]}</p>
      </li>
    );
  });

  return <ul>{readyToDisplay} </ul>;
};
