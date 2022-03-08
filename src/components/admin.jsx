import React, { Component } from "react";
import { Link } from "react-router-dom";

class Admin extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1 className="mb-4">Admin</h1>
        <div className="row">
          <div className="col-2">
            <Link to="/products/new" className="btn btn-outline-primary mb-1">
              Add Product <i className="fa-solid fa-plus"></i>
            </Link>
          </div>
          <div className="col">
            <table className="table table-default fs-5">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <button className="btn" onClick={() => this.props.handleDelete(product)}>
                        <i className="fa-solid fa-trash text-danger"></i>
                      </button>
                      <Link to={`/products/${product.id}`} className="btn">
                        <i className="fa-solid fa-pen text-info"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
