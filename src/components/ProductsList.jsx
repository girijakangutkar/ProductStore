import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ProductsList() {
  const [product, setProduct] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProduct(data.products);
    } catch (err) {
      console.log("Error occurred", err);
    }
  }

  function sortIt() {
    if (sortByPrice === "LtoH") {
      return [...product].sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "HtoL") {
      return [...product].sort((a, b) => b.price - a.price);
    }
    return product;
  }

  function allFiltering() {
    const sortedProducts = sortIt();
    if (filterCategory === "All" || filterCategory === "") {
      return sortedProducts;
    }
    return sortedProducts.filter((ele) => ele.category === filterCategory);
  }

  if (product.length == 0) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <label>Sort by price:</label>
        <select
          value={sortByPrice}
          onChange={(e) => setSortByPrice(e.target.value)}
        >
          <option value="">-- Select sort --</option>
          <option value="LtoH">Low to High</option>
          <option value="HtoL">High to Low</option>
        </select>
        <label>Filter by category:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          {[...new Set(product.map((ele) => ele.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        {allFiltering().map((pro) => (
          <div key={pro.id}>
            <h3>{pro.title}</h3>
            <h2>{pro.category}</h2>
            <p>{pro.price}</p>
            <img src={pro.images} width={400} height={300} />
            <button>
              <NavLink to={`/products/${pro.id}`}>Open this</NavLink>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsList;
