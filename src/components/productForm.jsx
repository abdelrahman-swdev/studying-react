import React, { Component } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import axios from "axios";

import InputForm from "./inputForm";

class ProductForm extends Component {
  state = {
    product: {
      id: 0,
      typeId: 0,
      name: "",
      price: 0,
      count: 0,
      isInCart: false,
    },
    errors: {},
  };

  componentDidMount() {
    const id = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    if (id !== "new") {
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then((res) => this.setState({ product: res.data }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // validation
    const errors = this.validate();

    // not valid
    if (errors) {
      this.setState({ errors });
      return;
    }

    // valid
    this.setState({ errors: {} });

    const product = { ...this.state.product };

    // edit product
    const id = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    if (id !== "new") {
      this.props.onEdit(product);
    } else {
      // add product
      product.typeId = +product.typeId;
      product.price = +product.price;
      this.props.onAdd(product);
    }
  };

  schema = Joi.object({
    name: Joi.string().required().label("Name"),
    price: Joi.number().min(1).required().label("Price"),
    typeId: Joi.number().min(1).required().label("Product Type"),
    id: Joi.optional(),
    count: Joi.optional(),
    isInCart: Joi.optional(),
  });

  validate = () => {
    let errors = {};
    const result = this.schema.validate(this.state.product);
    if (result.error === null) return null;
    for (const err of result.error.details) {
      errors[err.path] = err.message;
    }
    return errors;
  };

  handleChange = ({ target }) => {
    // clone state
    const product = { ...this.state.product };
    // edit
    product[target.name] = target.value;
    // set state
    this.setState({ product });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <h1 className="mb-4">Save Product</h1>

          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <InputForm
                type="text"
                name="name"
                label="Name"
                value={this.state.product.name}
                error={this.state.errors.name}
                onChange={this.handleChange}
              />
              <InputForm
                type="number"
                name="price"
                label="Price"
                value={this.state.product.price}
                error={this.state.errors.price}
                onChange={this.handleChange}
              />
              <div className="mb-3">
                <select
                  id="typeId"
                  name="typeId"
                  className="form-select"
                  value={this.state.product.typeId}
                  onChange={this.handleChange}
                >
                  <option value="">Type of product</option>
                  {this.props.getTypes().map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>

                {this.state.errors.typeId && (
                  <span className="text-danger">
                    "Product Type" is not allowed to be empty
                  </span>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <Link to="/admin-panel" className="btn btn-dark">
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductForm;
