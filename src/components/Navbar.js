import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
 const [categories, setCategories] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState("");
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const navigate = useNavigate();
 const dropdownRef = useRef(null);

 useEffect(() => {
 fetch("https://fakestoreapi.com/products/categories")
 .then((response) => response.json())
 .then((json) => setCategories(json));
 }, []);

 const toggleCategory = (category) => {
 setSelectedCategory(category === selectedCategory ? "" : category);
 };

 const handleCategoryChange = (e) => {
 const category = e.target.value;
 toggleCategory(category);
 if (category !== selectedCategory) {
 if (category !== "Select a Category") {
 navigate(`/Categories/${category}`);
 } else {
 navigate("/");
 }
 } else {
 navigate("/");
 }
 };

 const handleEscKey = (e) => {
 if (e.keyCode === 27) {
 setIsMenuOpen(false);
 }
 };

 const handleOutsideClick = (e) => {
 if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
 setIsMenuOpen(false);
 }
 };

 useEffect(() => {
 window.addEventListener("keydown", handleEscKey);
 window.addEventListener("click", handleOutsideClick);

 return () => {
 window.removeEventListener("keydown", handleEscKey);
 window.removeEventListener("click", handleOutsideClick);
 };
 }, []);

 const handleDropdownClick = () => {
 setIsMenuOpen(!isMenuOpen);
 };

 return (
 <nav className="Navbar">
 <h1 className="Site">
 <Link to="/">
 new-my-store-app
 </Link>
 </h1>

 <div className="Menu">
 <div className="MenuElements">
 <div className="MenuHome">
 <Link to="/">
 Home
 </Link>
 </div>

 <div className="Categories" ref={dropdownRef}>
 <select
 value={selectedCategory}
 onChange={handleCategoryChange}
 className="form-control"
 onClick={handleDropdownClick}
 >
 <option value="Select a Category">Select a Category</option>
 {categories.map((category) => (
 <option key={category} value={category}>
 #{category}
 </option>
 ))}
 </select>
 </div>

 <div className="MenuCart">
 <button>
 <Link to="/Cart">
 <i className="fa fa-cart-arrow-down"></i>
 <span className="ButtonTitle">&nbsp;Your&nbsp;Cart</span>
 </Link>
 </button>
 </div>
 </div>
 </div>
 </nav>
 );
};

export default Navbar;
