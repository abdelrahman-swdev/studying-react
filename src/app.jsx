import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/navbar";
import ShoppingCart from "./components/shoppingCart";
import Home from "./components/home";
import About from "./components/about";
import ContactUs from "./components/contactus";
import Users from "./components/users";
import UserDetails from "./components/userDetails";
import Menu from "./components/menu";

class App extends Component {
  state = {
    types: [
      { id: 0, name: "All" },
      { id: 1, name: "Meat" },
      { id: 2, name: "Sides" },
      { id: 3, name: "Drink" },
    ],
    products: [
      {
        id: 1,
        typeId: 1,
        name: "Burger",
        price: 50,
        count: 0,
        isInCart: false,
      },
      { id: 2, typeId: 3, name: "Cola", price: 10, count: 0, isInCart: false },
      { id: 3, typeId: 2, name: "Fries", price: 15, count: 0, isInCart: false },
      {
        id: 4,
        typeId: 2,
        name: "Cheese",
        price: 30,
        count: 0,
        isInCart: false,
      },
      { id: 5, typeId: 3, name: "Pepsi", price: 13, count: 0, isInCart: false },
      {
        id: 6,
        typeId: 3,
        name: "Miranda",
        price: 12,
        count: 0,
        isInCart: false,
      },
      {
        id: 7,
        typeId: 1,
        name: "Chiken",
        price: 45,
        count: 0,
        isInCart: false,
      },
    ],
    pageSize: 2,
    activePage: 1,
    currentFilter: 0,
  };

  // deleteHandler = prod => {
  //   // clone state
  //   const products = [...this.state.products];
  //   const index = products.indexOf(prod);
  //   products[index] = {...products[index]};
  //   // edit state
  //   products[index].isInCart = !products[index].isInCart
  //   // set state
  //   this.setState({products});
  // };

  increaseCountHandler = (id) => {
    // clone state
    const products = [...this.state.products];
    // const index = products.indexOf(p => p.id === id);
    // products[index] = {...products[index]};

    // edit state
    products.find((p) => p.id === id).count++;

    //set state
    this.setState({ products });
  };

  resetHandler = () => {
    // clone state
    let products = [...this.state.products];

    // edit state
    products = products.map((p) => {
      return {
        ...p,
        count: 0,
      };
    });

    //set state
    this.setState({ products });
  };

  PageChangedHandler = (pageNumber) => {
    this.setState({ activePage: pageNumber });
  };

  filterChangedHandler = (typeId) => {
    this.setState({ currentFilter: typeId, activePage: 1 });
  };

  cartChangedHandler = (prod) => {
    // clone state
    const products = [...this.state.products];
    const index = products.indexOf(prod);
    products[index] = { ...products[index] };
    // edit state
    products[index].isInCart = !products[index].isInCart;
    // set state
    this.setState({ products });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          cartCount={this.state.products.filter((p) => p.isInCart).length}
        />
        <main className="container mt-4">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/users" element={<Users />}>
              <Route path=":id" element={<UserDetails />} />
              <Route path="nested" element={<Home />} />
            </Route>
            <Route
              path="/cart"
              element={
                <ShoppingCart
                  products={this.state.products.filter((p) => p.isInCart)}
                  onDelete={this.cartChangedHandler}
                  onPlus={this.increaseCountHandler}
                  onReset={this.resetHandler}
                />
              }
            />
            <Route
              path="/menu"
              element={
                <Menu
                  products={this.state.products}
                  types={this.state.types}
                  currentFilter={this.state.currentFilter}
                  OnCartChanged={this.cartChangedHandler}
                  pageSize={this.state.pageSize}
                  activePage={this.state.activePage}
                  onPageChanged={this.PageChangedHandler}
                  OnFilterChanged={this.filterChangedHandler}
                />
              }
            />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
