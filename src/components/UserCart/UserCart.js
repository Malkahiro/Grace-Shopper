import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserCart.css"
import { getUser } from '../../axios-services'

const UserCart = (props) => {
    const username = props.username;
    const [user, setUser] = useState('');
    useEffect(() => {
      getUser(username)
        .then((results) => {
          setUser(results);
        })
        .catch((error) => console.error(error));
    }, []);
    
    return (
        <div id = "cart">
            <h1>{user.username}'s Cart</h1>
            <Link 
            id= "success-link"
            to= "/success">Submit</Link>
        </div>
    )
}
export default UserCart