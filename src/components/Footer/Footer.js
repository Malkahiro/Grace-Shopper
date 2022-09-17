import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"
const Footer = () => {
    return (
        <div id = "footer">
            <Link 
            id= "admin"
            to= "/admin">ADMIN</Link>
        </div>
    )
}
export default Footer