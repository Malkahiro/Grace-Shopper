import React from "react";
import { Link} from "react-router-dom";

const DropDown = () => {
    return ( <ul>
        <li><Link to={'/products'}>All</Link></li>
        <li><Link to={'/products/books'}>Books</Link></li>
        <li><Link to={'/products/movies'}>Movies</Link></li>
    </ul> );
}
 
export default DropDown;