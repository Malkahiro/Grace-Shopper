import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"
const Footer = () => {
    return (
        <div id = "footer">
            <Link 
            className="footer-btns"
            id= "admin"
            to= "/admin">ADMIN</Link>
            <Link 
            className="footer-btns"
            id= "create-product"
            to= "/createproduct">CREATE PRODUCT</Link>
            <Link 
            className="footer-btns"
            id= "users"
            to= "/users">USERS</Link>
        </div>
    )
}
export default Footer