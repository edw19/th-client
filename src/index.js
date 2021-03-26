import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//noty imports
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";

import "./index.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { cliente } from "./Apollo";

console.log("variable NODE_ENV", process.env.NODE_ENV);
console.log("variable URI_DEPLOY", process.env.URI_DEPLOY);

ReactDOM.render(
  <ApolloProvider client={cliente}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
