import React, { Component } from "react";

class Product extends Component {

  render() {
      
    const { name, count, id, price } = this.props.product;

    return (
      <div>
        <span>{name}</span>
        <span
          className={
            count === 0 ? "badge bg-warning m-2" : "badge bg-primary m-2"
          }
        >
          {count}
        </span>

        <button
          className="btn btn-sm btn-success m-2"
          onClick={() => this.props.onPlus(id)}
        >
          <i className="fa-solid fa-plus"></i>
        </button>

        <button
          onClick={() => this.props.onDelete(id)}
          className="btn btn-sm btn-danger m-2"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    );
  }
}

export default Product;
