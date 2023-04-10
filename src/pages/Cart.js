import { useContext, useState } from "react";
import { CartContext } from "../components/Context";
import { Link } from "react-router-dom";

import "../App.css";

const Cart = () => {
 const Globalstate = useContext(CartContext);
 const state = Globalstate.state;
 console.log(state);
 const dispatch = Globalstate.dispatch;

 const total = state.reduce((total, data) => {
 return total + data.price * (data.Quantity || 1);
 }, 0);

 const [selectCard, setSelectCard] = useState(null);
 const toggleSingleProduct = (id) => {
 setSelectCard(selectCard === id ? null : id);
 };

 return (
 <div className="CartPage">

 <div className="PageBody">
 <>
 <br/>

 <div className="ProductsTotals">
 <span>Total: </span>
 {state.length > 0 && (
 <h2 className="ProductsTotal">
 <sup className="currency">$</sup>
 {parseInt(total).toLocaleString()}
 <sup className="decimal">{(total % 1).toFixed(2).substring(1)}</sup>
 </h2>
 )}
 </div>

 <br/>

<div className="addedProducts">
{state.map((data, index) => {
 return (
 <div className="Container" key={data.id}>
 <div className="Card" key={index}>
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

<div className="Hesap">
<h4 className="prices">
 <sup className="currency">$</sup>
 {parseInt(data?.price).toLocaleString()}
 <sup className="decimal">
 {(data?.price % 1).toFixed(2).substring(1)}
 </sup>
 </h4>
 
 <p className="Quantity">{"✖"} {data.Quantity || 1}</p>
</div>

 <div className="Crease">
 <button
 onClick={() =>
 dispatch({ type: "INCREASE", payload: data })
 }
 >
 {"➕"}
 </button>
 &nbsp;
 <button
 onClick={() => {
 if (data.Quantity > 1) {
 dispatch({ type: "DECREASE", payload: data });
 } else {
 dispatch({ type: "REMOVE", payload: data });
 }
 }}
 >
 {"➖"}
 </button>
 </div>
 <br />

 <div className="ProductsTotals">
 <span>{"〓 "}</span>
 {state.length > 0 && (
 <h2 className="ProductsTotal">
 <sup className="currency">$</sup>
 {parseInt(data.price * (data.Quantity || 1)).toLocaleString()}
 <sup className="decimal">
 {((data.price * (data.Quantity || 1)) % 1)
 .toFixed(2)
 .substring(1)}
 </sup>
 </h2>
 )}
 </div>

 <button
 className="Remove"
 onClick={() =>
 dispatch({ type: "REMOVE", payload: data })
 }
 >
 Remove
 </button>
 
 </div>
 </div>
 );
 })}
</div>

<br/>

 
<div className="ProductsTotals">
 <span>Total: </span>
 {state.length > 0 && (
 <h2 className="ProductsTotal">
 <sup className="currency">$</sup>
 {parseInt(total).toLocaleString()} 
 <sup className="decimal">{(total % 1).toFixed(2).substring(1)}</sup>
 </h2>
 )}
</div>



 <br/>
 </>
 </div>

 

 </div>
 );
};

export default Cart;
