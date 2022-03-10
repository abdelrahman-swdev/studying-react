import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import NavBar from "./components/navbar";
import ShoppingCart from "./components/shoppingCart";
import Home from "./components/home";
import About from "./components/about";
import ContactUs from "./components/contactus";
import Users from "./components/users";
import UserDetails from "./components/userDetails";
import Menu from "./components/menu";
import Login from "./components/login";
import ProductForm from "./components/productForm";
import Admin from "./components/admin";
import { ToastContainer, toast } from "react-toastify";

class App extends Component {
  state = {
    types: [],
    products: [],
    pageSize: 4,
    activePage: 1,
    currentFilter: 0,
  };

  componentDidMount = () => {
    this.fetchProducts();
    this.fetchTypes();
  };

  fetchProducts = () => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => this.setState({ products: res.data }));
  };

  fetchTypes = () => {
    axios
      .get("http://localhost:3000/types")
      .then((res) => this.setState({ types: res.data }));
  };

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
    products[index].count = 0;
    // set state
    this.setState({ products });
  };

  AddProductToUI = (prod) => {
    // clone
    const products = [...this.state.products];
    // edit
    products.unshift(prod);
    // set state
    this.setState({ products });
  };

  updateProductInUI = (prod) => {
    // clone state
    const products = [...this.state.products];
    const oldProduct = products.find((p) => p.id === prod.id);
    const index = products.indexOf(oldProduct);
    products[index] = { ...oldProduct };
    // edit state
    products[index].name = prod.name;
    products[index].price = prod.price;
    products[index].typeId = prod.typeId;
    // set state
    this.setState({ products });
  };

  deleteProductFromUI = (prod) => {
    // clone
    let products = [...this.state.products];
    // edit
    products = products.filter((p) => p.id !== prod.id);
    // set state
    this.setState({ products });
  };

  handleAddProduct = (product) => {
    axios.post("http://localhost:3000/products", product).then((res) => {
      this.AddProductToUI(res.data);
    });
  };

  handleEditProduct = (prod) => {
    axios
      .put(`http://localhost:3000/products/${prod.id}`, prod)
      .then((res) => {
        if (res.status === 200) {
          this.updateProductInUI(prod);
        }
      })
      .catch((er) => console.log(er));
  };

  handleDelete = async (prod) => {
    // optimistic delete
    const originalData = [...this.state.products];
    this.deleteProductFromUI(prod);

    try {
      await axios.delete(`http://localhost:3000/products/${prod.id}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.info("Product already deleted.", { autoClose: 3000 });
      }
      this.setState({ products: originalData });
    }
  };

  getTypes = () => {
    return this.state.types.filter((t) => t.id !== 0);
  };

  search = (query) => {};

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar
          cartCount={this.state.products.filter((p) => p.isInCart).length}
        />
        <main className="container mt-4">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
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
                  search={this.search}
                />
              }
            />
            <Route
              path="/admin-panel"
              element={
                <Admin
                  products={this.state.products}
                  handleDelete={this.handleDelete}
                />
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProductForm
                  onAdd={this.handleAddProduct}
                  onEdit={this.handleEditProduct}
                  getTypes={this.getTypes}
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
