import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { CartContext } from "../components/Context";

const Home = ({ data }) => {
 const GlobalState = useContext(CartContext);
 const dispatch = GlobalState.dispatch;
 const [selectCard, setSelectCard] = useState(null);

 const toggleSingleProduct = (id) => {
 setSelectCard(selectCard === id ? null : id);
 };

 return (
 <>
 <div className="PageBody">
 <h2 className="Welcome">
 Welcome in "new-my-store-app"<sup>V 06·⁴</sup>
 </h2>

 <div className="Container">
 {data.map((data) => {
 data.Quantity = 1;
 return (
 <div className="Card" key={data?.id}>
 <Link
 
 to={`/Products/${data?.id}`}
 className="Content"
 onClick={() => toggleSingleProduct(data?.id)}
 >
 <p className="id">{data?.id}</p>

 <div className="image">
 <img src={data?.image} alt={data?.title} />
 </div>

 <h2 className="title">{data?.title}</h2>
 </Link>

 <h2 className="prices">
 <sup className="currency">$</sup>
 {parseInt(data?.price)}
 <sup className="decimal">
 {(data?.price % 1).toFixed(2).substring(1)}
 </sup>
 </h2>

 <div className="Rate">
 <Rating
 name="read-only"
 value={parseInt(data?.rating?.rate)}
 readOnly
 />
 </div>

 <Link
 to={`/Categories/${data?.category}`}
 className="category-Link"
 >
 <h2 className="category">#{data?.category}</h2>
 </Link>
 
 <button
 className="ProductButton"
 onClick={() => dispatch({ type: "ADD", payload: data })}
 >
 <i className="fa fa-cart-arrow-down"></i>
 <span className="ButtonTitle">
 &nbsp;Add&nbsp;to&nbsp;Cart
 </span>
 </button>
 </div>
 );
 })}
 </div>
 </div>
 </>
 );
};

export default Home;
