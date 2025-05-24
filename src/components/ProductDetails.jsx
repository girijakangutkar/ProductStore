import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchIt();
  }, [id]);

  async function fetchIt() {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      console.log("in details", data);
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <button>
        <NavLink to="/">Back</NavLink>
      </button>
      <h2>Title: {product.title}</h2>
      <h2>Price: {product.price}</h2>
      <p>Description: {product.description}</p>

      <p>Discount Percentage: {product.discountPercentage}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
      <p>Brand: {product.brand}</p>
      <p>Weight: {product.weight}</p>
      {/* <p>{product.dimensions}</p> */}
      <p>Warranty Information: {product.warrantyInformation}</p>
      <p>Return Policy: {product.returnPolicy}</p>
      {/* <p>{product.reviews}</p> */}
      <p>Availability Status: {product.availabilityStatus}</p>
    </div>
  );
}

export default ProductDetails;
