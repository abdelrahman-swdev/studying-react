import React from "react";
import _ from "lodash";

import CartIcon from "./cartIcon";
import Pagination from "./pagination";
import Filter from "./filter";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const {
    products,
    OnCartChanged,
    activePage,
    pageSize,
    onPageChanged,
    types,
    currentFilter,
    OnFilterChanged,
    search,
  } = props;

  // filter login>>>
  let showedProducts = [];
  showedProducts =
    currentFilter === 0
      ? products
      : products.filter((p) => p.typeId === currentFilter);

  let showedProductsLength = showedProducts.length;

  // pagination logic>>>
  // start index
  const startIndex = (activePage - 1) * pageSize;
  // convert products to lodash object wich chainable
  // (just for learning purpose, you could get the same result just by using slice js array method)
  // like products.slice(startIndex, activePage * pageSize)
  showedProducts = _(showedProducts).slice(startIndex).take(pageSize).value();

  const handleSearch = ({ target }) => {
    console.log(target.value);
    search(target.value);
  };

  return (
    <React.Fragment>
      <h1 className="mb-4">Menu</h1>

      <div className="row">
        <div className="col-md-3">
          <p>Filter By Types</p>
          <Filter
            types={types}
            OnFilterChanged={OnFilterChanged}
            currentFilter={currentFilter}
          />
        </div>

        <div className="col">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginTop: "calc(24px + 1rem)" }}
          >
            <input
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="search.."
              className="form-control w-50"
              onChange={handleSearch}
            />
          </div>
          <table
            className="table table-default fs-5"
            style={{ marginTop: "15px" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {showedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <CartIcon prod={product} OnCartChanged={OnCartChanged} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showedProductsLength > pageSize && (
            <Pagination
              pagesCount={showedProductsLength / pageSize}
              activePage={activePage}
              onPageChanged={onPageChanged}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Menu;
