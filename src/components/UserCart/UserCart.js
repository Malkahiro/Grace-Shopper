import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserCart.css"
import { getUser, getUserCart } from '../../axios-services'

const UserCart = (props) => {
  let subTotal = 0;
  let totalPrice = 0;
  let fee = 0;
    const username = props.username;
    const [user, setUser] = useState('');
    const [userCart, setUserCart] = useState({products:[]});
    const [pay, setPay] = useState(true);
    const navigate = useNavigate();
  const navigateNew = () => {
    navigate("/usercheckout");
  };

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
        if (cart.id === undefined) {
          setPay(false)
        }
      }
    }, [])


    const total = userCart.products?.map((product) => {
      console.log(product)
      const cost = product.price
      subTotal += cost
        fee = 3.99;
        totalPrice = subTotal + fee;
    })
    
    

    return (
        <div id = "cart">
            <h1 id="title">{user.username}'s Cart</h1>
            <div>
            {userCart.products?.map ((product) => {
              return(
              <div key={product.id} className= "cart-products">
                  <img src={product.imageURL} id="img"></img>
                <div>
                <h3>{product.name}</h3>
                <p>${product.price}.00</p>
                <p>{product.creator}</p>
                <p>Quantity:</p>
                <div id = "quantity">
                <button id = "plus" className="q-btn">+</button>
                <button id = "minus" className="q-btn">-</button>
                </div>
                <br />
                <button>Remove Item</button>
                </div>
                </div>
              )
            }
            )} 
            </div>
            <div id="totals">
            <p>Subtotal: ${subTotal}.00</p>
            <p>Delivery Fee: ${fee}</p>
            <p>Total: ${totalPrice}</p>
            </div>
            <div>
            {pay? (
              <button
              id="new-post-button"
              className="m-button"
              onClick={navigateNew}
            >
              Checkout
            </button>
            ): null}
            </div> 
        </div>
    )
}
export default UserCart