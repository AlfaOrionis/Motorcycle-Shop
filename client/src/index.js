import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import ReduxStore from "./store";

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GoogleOAuthProvider}>
    <Provider store={ReduxStore()}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
