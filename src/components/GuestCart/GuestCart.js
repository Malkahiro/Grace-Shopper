import React from "react";
import { Link } from "react-router-dom";
import "./GuestCart.css"


const GuestCart = () => {
    return (
        <div id = "cart">
            <h1>Guest's Cart</h1>
            <Link 
            id= "success-link"
            to= "/success">Submit</Link>
        </div>
    )
}
export default GuestCart