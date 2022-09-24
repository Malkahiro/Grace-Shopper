import React from "react";
import { Link } from "react-router-dom";

const DropDown = () => {
    return ( <select >
        
        <option value="">{<Link to={'/products/books'}>Books</Link>}</option>
        <option value="">Movie</option>
        <option value="">Music</option>
    </select> );
}
 
export default DropDown;