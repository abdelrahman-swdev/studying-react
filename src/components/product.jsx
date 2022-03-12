import React from "react";

const Product = (props) => {
  const { name, count } = props.product;
  const { onPlus, onDelete } = props;

  return (
    <div>
      <h3 className="d-inline">{name}</h3>
      <span
        className={
          count === 0 ? "badge bg-warning m-2" : "badge bg-primary m-2"
        }
      >
        {count}
      </span>

      <button className="btn btn-success m-2" onClick={() => onPlus(props.product)}>
        <i className="fa-solid fa-plus"></i>
      </button>

      <button
        onClick={() => onDelete(props.product)}
        className="btn btn-danger m-2"
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default Product;
