import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";

import InputForm from "./inputForm";

const Login = (props) => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    isPersistent: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = Joi.object({
    username: Joi.string().required().label("User Name"),
    password: Joi.string().min(6).required().label("Password"),
    isPersistent: Joi.optional(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // validation
    const errors = validate(schema, account);
    // not valid
    if (errors) {
      console.log("setting errors");
      setErrors(errors);
      return;
    }
    // valid
    setErrors({});
    // call backend
    navigate("/menu", {replace: true});
    console.log("Logged In");
  };

  const handleChange = ({ target }) => {
    // clone state
    const data = { ...account };
    // edit
    data[target.name] = target.value;
    // set state
    setAccount(data);
  };

  const handleCheckbox = () => {
    // clone state
    const data = { ...account };
    // edit
    data.isPersistent = !data.isPersistent;
    // set state
    setAccount(data);
  };

  return (
    <div className="row">
      <h1 className="mb-4">Login</h1>
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <InputForm
            type="text"
            name="username"
            label="User Name"
            value={account.username}
            error={errors.username}
            onChange={handleChange}
          />
          <InputForm
            type="password"
            name="password"
            label="Password"
            value={account.password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={account.isPersistent}
              onChange={handleCheckbox}
              id="remeberMe"
            />
            <label className="form-check-label" htmlFor="remeberMe">
              Remember Me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// return null if form is valid, the errors otherwise
function validate(schema, value) {
  let errors = {};
  // Joi validation
  const result = schema.validate(value);
  const { error } = result;
  if (error === null) return null;
  error.details.map((e) => (errors[e.path] = e.message));
  return errors;
}
