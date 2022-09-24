import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { createProduct, getAPIHealth, getProductId, getProducts, getUser } from '../axios-services';
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
import DropDown from './DropDown/DropDown';
import Books from './FilteredPages/Books';
import Movies from './FilteredPages/Movies';
import EditDetails from './EditProduct/EditDetails';
import GuestCart from './GuestCart/GuestCart';
import UserCart from './UserCart/UserCart';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [APIHealth, setAPIHealth] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);
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

    try {
      const getData = async () =>{
          const data = await getProducts();  
          setProducts(data);
          setSearchResults(data);
      }
    getData()
  } catch (error) {
    console.error(error)
  }

    
  }, []);
  useEffect(() => {
    try{
    if (localStorage.getItem("token")) {
      setUsername(localStorage.getItem("username"))
      const userData = async () => {
        const user = await getUser(username);
        if (user.isAdmin === true) {
          setIsAdmin(true)
        } 
      }
      userData()
    }
  } catch (error) {
    console.error(error)
  }
  }, [isLoggedIn, isAdmin]);

  console.log(isAdmin)
  return (
    
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      <SearchBar products={products} setSearchResults={setSearchResults} />
      <DropDown />
      <Routes>
      <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
        />

        <Route path="/products" element={<Products isLoggedIn={isLoggedIn} products={searchResults} setProducts={setProducts}/>} />
        <Route path='/products/books' element={<Books isLoggedIn={isLoggedIn} products={searchResults} />} />
        <Route path='/products/movies' element={<Movies isLoggedIn={isLoggedIn} products={searchResults} />} />
        <Route path='/products/:id' element={<ProductDetails products={products} />}></Route>
        <Route path="/success" element={<Success isLoggedIn={isLoggedIn} />} />
        {isAdmin && isLoggedIn && <><Route path="/admin" element={<Admin isLoggedIn={isLoggedIn} setProducts={setProducts} products={products} isAdmin={isAdmin} />} />
        <Route path="/users" element={<Users isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
        <Route path="/createproduct" element={<CreateProduct isLoggedIn={isLoggedIn} isAdmin={isAdmin} products={products} setProducts={setProducts} />} />
        <Route path='/editproduct/:id' element={<EditDetails products={products} setProducts={setProducts}  isAdmin={isAdmin}/>}></Route> </>}
        <Route path="/guestcart" element={<GuestCart setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/usercart" element={<UserCart isLoggedIn={isLoggedIn} />} />
        <Route exact path='/' element={<Products isLoggedIn={isLoggedIn} products={searchResults}  setProducts={setProducts}/>}></Route>

        </Routes>

        {isAdmin && isLoggedIn && <Footer isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>}
    </div>
  );
};

export default App;
