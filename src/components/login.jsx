import React, { Component } from "react";
import Joi from "joi-browser";

import InputForm from "./inputForm";

class Login extends Component {
  state = {
    account: {
      username: "",
      password: "",
      isPersistent: false,
    },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label("User Name"),
    password: Joi.string().min(6).required().label("Password"),
  });

  handleSubmit = (e) => {
    e.preventDefault();

    // validation
    const errors = this.validate();

    // not valid
    if (errors) {
      this.setState({ errors });
      return;
    }

    // valid
    this.setState({ errors: {} });

    // call backend
    console.log("done");
  };

  // return null if form is valid, the errors otherwise
  validate = () => {
    let errors = {};

    // Joi validation
    const result = this.schema.validate(this.state.account);

    const { error } = result;

    if (error === null) return null;

    error.details.map((e) => (errors[e.path] = e.message));
    return errors;
  };

  handleChange = ({ target }) => {
    // clone state
    const account = { ...this.state.account };
    // edit
    account[target.name] = target.value;
    // set state
    this.setState({ account });
  };

  handleCheckbox = () => {
    // clone state
    const account = { ...this.state.account };
    // edit
    account.isPersistent = !account.isPersistent;
    // set state
    this.setState({ account });
  };

  render() {
    return (
      <div className="row">
        <h1 className="mb-4">Login</h1>
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <InputForm
              type="text"
              name="username"
              label="User Name"
              value={this.state.account.username}
              error={this.state.errors.username}
              onChange={this.handleChange}
            />
            <InputForm
              type="password"
              name="password"
              label="Password"
              value={this.state.account.password}
              onChange={this.handleChange}
              error={this.state.errors.password}
            />
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.state.account.isPersistent}
                onChange={this.handleCheckbox}
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
  }
}

export default Login;
