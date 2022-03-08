import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./app";

import "../node_modules/bootswatch/dist/zephyr/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
