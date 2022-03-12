import React, { useState, useEffect } from "react";
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

const App = (props) => {
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [activePage, setActivePage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState(0);

  // after every render
  useEffect(() => {
    fetchProducts(setProducts);
    fetchTypes(setTypes);
  }, []);

  const increaseCountHandler = (prod) => {
    // clone state
    const data = [...products];
    const index = data.indexOf(prod);
    data[index] = { ...data[index] };
    // edit state
    data[index].count++;
    //set state
    setProducts(data);
  };

  const resetHandler = () => {
    // clone state
    let data = [...products];
    // edit state
    data = data.map((p) => {
      return {
        ...p,
        count: 0,
      };
    });
    //set state
    setProducts(data);
  };

  const PageChangedHandler = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const filterChangedHandler = (typeId) => {
    setCurrentFilter(typeId);
    setActivePage(1);
  };

  const cartChangedHandler = (prod) => {
    // clone state
    const data = [...products];
    const index = data.indexOf(prod);
    data[index] = { ...data[index] };
    // edit state
    data[index].isInCart = !data[index].isInCart;
    data[index].count = 0;
    // set state
    setProducts(data);
  };

  const AddProductToUI = (prod) => {
    // clone
    const data = [...products];
    // edit
    data.unshift(prod);
    // set state
    setProducts(data);
  };

  const updateProductInUI = (prod) => {
    // clone state
    const data = [...products];
    const oldProduct = products.find((p) => p.id === prod.id);
    const index = data.indexOf(oldProduct);
    data[index] = { ...data[index] };
    // edit state
    data[index].name = prod.name;
    data[index].price = prod.price;
    data[index].typeId = prod.typeId;
    // set state
    setProducts(data);
  };

  const deleteProductFromUI = (prod) => {
    // clone
    let data = [...products];
    // edit
    data = data.filter((p) => p.id !== prod.id);
    // set state
    setProducts(data);
  };

  const handleAddProduct = async (product) => {
    try {
      const res = await axios.post("http://localhost:3000/products", product);
      AddProductToUI(res.data);
      return true;
    } catch {
      return false;
    }
  };

  const handleEditProduct = async (prod) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/products/${prod.id}`,
        prod
      );
      if (res.status === 200) {
        updateProductInUI(prod);
        return true;
      }
    } catch {
      return false;
    }
  };

  const handleDelete = async (prod) => {
    // optimistic delete
    const originalData = [...products];
    deleteProductFromUI(prod);
    try {
      await axios.delete(`http://localhost:3000/products/${prod.id}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.info("Product already deleted.", { autoClose: 3000 });
      }
      setProducts(originalData);
    }
  };

  const getTypes = () => {
    return types.filter((t) => t.id !== 0);
  };

  const search = (query) => {};

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar cartCount={products.filter((p) => p.isInCart).length} />
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
                products={products.filter((p) => p.isInCart)}
                onDelete={cartChangedHandler}
                onPlus={increaseCountHandler}
                onReset={resetHandler}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <Menu
                products={products}
                types={types}
                currentFilter={currentFilter}
                OnCartChanged={cartChangedHandler}
                pageSize={pageSize}
                activePage={activePage}
                onPageChanged={PageChangedHandler}
                OnFilterChanged={filterChangedHandler}
                search={search}
              />
            }
          />
          <Route
            path="/admin-panel"
            element={<Admin products={products} handleDelete={handleDelete} />}
          />
          <Route
            path="/products/:id"
            element={
              <ProductForm
                onAdd={handleAddProduct}
                onEdit={handleEditProduct}
                getTypes={getTypes}
              />
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;

const fetchProducts = (setter) => {
  axios.get("http://localhost:3000/products").then((res) => setter(res.data));
};

const fetchTypes = (setter) => {
  axios.get("http://localhost:3000/types").then((res) => setter(res.data));
};
