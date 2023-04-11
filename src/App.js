import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import AllCategories from "./pages/Category";
import Cart from "./pages/Cart";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fakestore();
  }, []);

  const fakestore = async () => {
    const response = await fetch("https://fakestoreapi.com/Products");
    const jsonData = await response.json();
    setData(jsonData);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/products/:id" element={<SingleProduct data={data} />} />
        <Route path="/categories/:category" element={<AllCategories />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
