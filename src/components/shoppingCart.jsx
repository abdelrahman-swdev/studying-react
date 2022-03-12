import React from "react";
import Product from "./product";

const ShoppingCart = (props) => {
  const { products, onDelete, onPlus, onReset } = props;

  return (
    <React.Fragment>
      <h1 className="display-5 mb-5">Shopping Cart</h1>
      {products.map((p) => (
        <Product key={p.id} product={p} onDelete={onDelete} onPlus={onPlus} />
      ))}
      <button onClick={onReset} className="btn btn-dark m-2">
        Reset
      </button>
    </React.Fragment>
  );
};

export default ShoppingCart;
