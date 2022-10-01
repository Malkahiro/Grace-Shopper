import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { getProducts, getUser } from '../axios-services';
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
import UserCart from './UserCart/UserCart';
import './App.css'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
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
        try{
          const user = await getUser(username);
          if (user.isAdmin === true) {
            setIsAdmin(true)
          }
        } catch(error){
          console.error(error)
        }
      }
      userData()
    }
  } catch (error) {
    console.error(error)
  }
  }, [isLoggedIn, isAdmin, username]);
  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      <Routes>
      <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
        />
       <Route path={'/products'} element={<><SearchBar products={products} setSearchResults={setSearchResults} /> <DropDown />
        <Products isLoggedIn={isLoggedIn} products={searchResults} setProducts={setProducts}/></>} />
        <Route path='/products/books' element={<> <SearchBar products={products} setSearchResults={setSearchResults} /> <DropDown />
         <Books isLoggedIn={isLoggedIn} products={searchResults} /> </>} />
        <Route path='/products/movies' element={<> <SearchBar products={products} setSearchResults={setSearchResults} /> <DropDown />
         <Movies isLoggedIn={isLoggedIn} products={searchResults} /> </>} />
        <Route path='/products/:id' element={<ProductDetails products={products} />}></Route>
        <Route path="/success" element={<Success isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        {isAdmin && isLoggedIn && <><Route path="/admin" element={<Admin isLoggedIn={isLoggedIn} setProducts={setProducts} products={products} isAdmin={isAdmin} />} />
        <Route path="/users" element={<Users isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
        <Route path="/createproduct" element={<CreateProduct isLoggedIn={isLoggedIn} isAdmin={isAdmin} products={products} setProducts={setProducts} />} />
        <Route path='/editproduct/:id' element={<EditDetails products={products} setProducts={setProducts}  isAdmin={isAdmin} username={username}/>}></Route> </>}
        <Route path="/usercart" element={<UserCart isLoggedIn={isLoggedIn} products={products} username={username}/>} />
        <Route exact path={'/'} element={<><SearchBar products={products} setSearchResults={setSearchResults} /> <DropDown />
        <Products isLoggedIn={isLoggedIn} products={searchResults} setProducts={setProducts}/></>} />
        </Routes>
        {isAdmin && isLoggedIn && <Footer isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>}
    </div>
  );
};
export default App;