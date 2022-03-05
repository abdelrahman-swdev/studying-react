import React from "react";

const CartIcon = (props) => {
  const { prod, OnCartChanged } = props;

  return (
    <i
      style={{ color: "#80808080", cursor: "pointer" }}
      className={
        prod.isInCart === true
          ? "fa-solid fa-cart-arrow-down text-dark"
          : "fa-solid fa-cart-arrow-down"
      }
      onClick={() => {
        OnCartChanged(prod);
      }}
    ></i>
  );
};

export default CartIcon;
