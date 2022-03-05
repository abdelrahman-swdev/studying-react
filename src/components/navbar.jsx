import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = (props) => {
  const { cartCount } = props;
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={`/`}>
            REACT
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/menu">
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact-us">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
            </ul>
            <NavLink className="nav-link" to="/cart">
              <span
                className="badge bg-primary"
                style={{ fontSize: "18px" }}
                href="#"
              >
                <i className="fa-solid fa-cart-shopping"></i> {cartCount}
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
