import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { isUndefined } from "lodash";
import { toast } from "react-toastify";

import App from "./app";

import "../node_modules/bootswatch/dist/zephyr/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   console.log("Request sent.");
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (isUndefined(error.response)) {
      toast.error("Something went wrong.", {
        autoClose: 3000,
      });
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
