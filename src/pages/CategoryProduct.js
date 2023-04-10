import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const CategoryProduct = () => {
 const [data, setData] = useState([]);

 useEffect(() => {
 ProductsCategories();
 }, []);
 const ProductsCategories = async () => {
 const response = await fetch(
 "https://fakestoreapi.com/Products/category/{data?.category}"
 );
 const jsonData = await response.json();
 setData(jsonData);
 };
};
