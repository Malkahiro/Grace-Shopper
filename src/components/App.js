import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { createProduct, getAPIHealth, getProductId, getProducts } from '../axios-services';
import '../style/App.css';
import Login from './Login/Login'
import Register from './Register/Register';
import Navbar from './Navbar/Navbar';
import Products from './Products/Products';
import ProductDetails from './Products/ProductDetails';
import SearchBar from './Search/SearchBar';
import Success from './Success/Success';
import Footer from './Footer/Footer';
import CreateProduct from './CreateProduct/CreateProduct';
import Admin from './Admin/Admin';
import Users from './Users/Users';
import EditDetails from './EditProduct/EditDetails';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const [APIHealth, setAPIHealth] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);

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


    
      const getData = async () =>{
        try {
          const data = await getProducts();  
          setProducts(data);
          setSearchResults(data);
        } catch (error) {
          console.error(error)
        }
      }
    getData().then(() => {
      console.log(products)
    })
     


  }, []);


  return (
    
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <SearchBar products={products} setSearchResults={setSearchResults} />
      <Routes>
      <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/products" element={<Products isLoggedIn={isLoggedIn} products={searchResults}  setProducts={setProducts}/>} />
        <Route path='/products/:id' element={<ProductDetails products={products} />}></Route>
        <Route path="/success" element={<Success isLoggedIn={isLoggedIn} />} />
        <Route path="/admin" element={<Admin isLoggedIn={isLoggedIn} setProducts={setProducts} products={products}/>} />
        <Route path="/users" element={<Users isLoggedIn={isLoggedIn} />} />
        <Route path="/createproduct" element={<CreateProduct isLoggedIn={isLoggedIn} />} />
        <Route path='/editproduct/:id' element={<EditDetails products={products} setProducts={setProducts} />}></Route>
        <Route exact path='/' element={<Products isLoggedIn={isLoggedIn} products={searchResults}  setProducts={setProducts}/>}></Route>
        </Routes>
        <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </div>
  );
};

export default App;
