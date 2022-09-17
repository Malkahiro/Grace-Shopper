import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, getProductId, getProducts } from '../axios-services';
import '../style/App.css';
import Login from './Login/Login'
import Register from './Register/Register';
import Navbar from './Navbar/Navbar';
import Products from './Products/Products';
import ProductDetails from './Products/ProductDetails';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const [APIHealth, setAPIHealth] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };
    

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();


    try{
      const getData = async () =>{
        const data = await getProducts();
        setProducts(data);
    } 
    getData();
    } catch(error) {
      console.error(error)
    }

  }, []);

  
// console.log(products);

  return (
    
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
      <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/products" element={<Products isLoggedIn={isLoggedIn}  products={products}/>} />
        <Route path='/products/:id' element={<ProductDetails products={products} />}></Route>
        </Routes>
    </div>
  );
};

export default App;
