import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  const { cartCount } = props;
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={`/`}>
            RIZO
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
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin-panel">
                  Admin
                </NavLink>
              </li>
            </ul>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-dark dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Join Us
              </button>
              <ul className="dropdown-menu">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </ul>
            </div>
            <NavLink className="nav-link" to="/cart">
              <span
                className="badge bg-primary"
                style={{ fontSize: "1rem" }}
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
