import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import ReduxStore from "./store";

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <GoogleOAuthProvider clientId="550262755575-qap1fbdbqvpgj0s6a8lbpt08okf26fv3.apps.googleusercontent.com">
    <Provider store={ReduxStore()}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
