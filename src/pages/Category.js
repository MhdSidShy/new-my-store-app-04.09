import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { CartContext } from "../components/Context";
import { useParams } from "react-router-dom";

const AllCategories = () => {
  const [Products, setProducts] = useState([]);
  const GlobalState = useContext(CartContext);
  const dispatch = GlobalState.dispatch;

  const { category } = useParams();

  const [selectCard, setSelectCard] = useState(null);
  const toggleSingleProduct = (id) => {
    setSelectCard(selectCard === id ? null : id);
  };
  useEffect(() => {
    fetch(`https://fakestoreapi.com/Products/category/${category}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [category]);

  console.log(selectCard);
  return (
    <div className="CategoryProducts">
      {Products.map((data) => (
        <div className="PageBody" key={data?.id}>
          <div className="Container">
            <div key={data?.id} className="Card">
              <Link
                to={`/products/${data?.id}`}
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

              <h2 className="price">{data?.price}</h2>

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
                onClick={() => {
                  dispatch({ type: "ADD", payload: data });
                  alert("Added to Cart!");
                }}
              >
                <i className="fa fa-cart-arrow-down"></i>
                <span className="ButtonTitle">&nbsp;Add&nbsp;to&nbsp;Cart</span>
              </button>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCategories;
