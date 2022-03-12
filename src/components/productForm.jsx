import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Joi from "joi-browser";
import axios from "axios";

import InputForm from "./inputForm";

const ProductForm = (props) => {
  const [product, setProduct] = useState({
    id: 0,
    typeId: 0,
    name: "",
    price: 0,
    count: 0,
    isInCart: false,
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useProduct(id, setProduct);

  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    price: Joi.number().min(1).required().label("Price"),
    typeId: Joi.number().min(1).required().label("Product Type"),
    id: Joi.optional(),
    count: Joi.optional(),
    isInCart: Joi.optional(),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // validation
    const errors = validate(schema, product);
    // not valid
    if (errors) {
      setErrors(errors);
      return;
    }
    // valid
    setErrors({});
    const data = { ...product };
    // edit product
    if (id !== "new") {
      const result = await props.onEdit(data);
      if (result) {
        navigate("/admin-panel");
      }
    } else {
      // add product
      data.typeId = +product.typeId;
      data.price = +product.price;
      const result = await props.onAdd(data);
      if (result) {
        navigate("/admin-panel");
      }
    }
  };

  const handleChange = ({ target }) => {
    // clone state
    const data = { ...product };
    // edit
    data[target.name] = target.value;
    // set state
    setProduct(data);
  };

  return (
    <React.Fragment>
      <div className="row">
        <h1 className="mb-4">Save Product</h1>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <InputForm
              type="text"
              name="name"
              label="Name"
              value={product.name}
              error={errors.name}
              onChange={handleChange}
            />
            <InputForm
              type="number"
              name="price"
              label="Price"
              value={product.price}
              error={errors.price}
              onChange={handleChange}
            />
            <div className="mb-3">
              <select
                id="typeId"
                name="typeId"
                className="form-select"
                value={product.typeId}
                onChange={handleChange}
              >
                <option value="">Type of product</option>
                {props.getTypes().map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.typeId && (
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
};

export default ProductForm;

// extract logic into a separate function
function validate(schema, value) {
  let errors = {};
  const result = schema.validate(value);
  if (result.error === null) return null;
  for (const err of result.error.details) {
    errors[err.path] = err.message;
  }
  return errors;
}

// custom hook
function useProduct(id, setter) {
  useEffect(() => {
    if (id !== "new") {
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then((res) => setter(res.data));
    }
  }, [id]);
}
