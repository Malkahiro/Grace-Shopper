import React from "react";
import {Link} from "react-router-dom";
import './DropDown.css'

const DropDown = () => {
    return ( <div className="dropdown">
        <button className="dropbtn">Media Type</button>
        <div className="dropdown-content">
        <Link to={'/products'}>All</Link>
        <Link to={'/products/books'}>Books</Link>
        <Link to={'/products/movies'}>Movies</Link>
        </div>
        </div> );
}
 
export default DropDown;