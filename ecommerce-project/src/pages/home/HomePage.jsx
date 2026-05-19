import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";


export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  //without using axios
  // fetch('http://localhost:3000/api/products')
  // .then((response)=>{
  //    return response.json
  //    }).then((data)=>{
  //       console.log(data);
  // });

  //using axios

  useEffect(() => {
    axios.get("http://localhost:3000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Header cart={cart} />
      <title>Home Page</title>

      <div className="home-page">
        <ProductsGrid products={products} />
      
      </div>
    </>
  );
}
