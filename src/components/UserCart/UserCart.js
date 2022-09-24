import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserCart.css"
import { getUser, getUserCart } from '../../axios-services'

const UserCart = (props) => {
    const username = props.username;
    const [user, setUser] = useState('');
    const [userCart, setUserCart] = useState({products:[]});
    useEffect(() => {
      getUser(username)
        .then((results) => {
          setUser(results);
          cartData(results.id)
        })
        .catch((error) => console.error(error));
      const cartData = async (id) => {
      const cart = await getUserCart(id)
      console.log(cart)
  setUserCart(cart)
      }
    }, [])

    return (
        <div id = "cart">
            <h1>{user.username}'s Cart</h1>
            <div>
            {userCart.products.map ((product) => {
              return(
              <div key={product.id} className= "cart-products">
                <p>{product.name}</p>
                </div>
              )
            }
            )}
            </div>
            <Link 
            id= "success-link"
            to= "/success">Submit</Link>
        </div>
    )
}
export default UserCart