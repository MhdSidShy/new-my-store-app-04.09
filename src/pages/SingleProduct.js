import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../components/Context";
import { Link } from "react-router-dom";

import "../App.css";
import Rating from "@mui/material/Rating";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/Products/${id}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [id]);

  console.log(data);

  return (
    <>
      <div className="SingleProduct">
        <div className="Card">
          <p className="id">{data?.id}</p>
          <div className="Container">
            <div className="image">
              <img src={data?.image} alt={data?.title} />
            </div>

            <div className="info">
              <h2 className="title">{data?.title}</h2>

              <h2 className="prices">
                <sup className="currency">$</sup>
                {parseInt(data?.price)}
                <sup className="decimal">
                  {(data?.price % 1).toFixed(2).substring(1)}
                </sup>
              </h2>

              <h2 className="price">{data?.price}</h2>

              <p className="description">{data?.description}</p>

              <div className="Rate">
                <Rating
                  name="read-only"
                  value={parseInt(data?.rating?.rate)}
                  readOnly
                />
              </div>

              <h2 className="category">
                <span>category:&nbsp;</span>
                <Link
                  to={`/Categories/${data?.category}`}
                  className="category-Link"
                >
                  #{data?.category}
                </Link>
              </h2>

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
      </div>
    </>
  );
};

export default SingleProduct;
