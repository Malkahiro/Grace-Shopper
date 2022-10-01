import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserCart.css"
import { getUser, getUserCart, deleteProductFromCart, checkoutCart } from '../../axios-services'


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
    console.log("changes")

  }, [userCart])
  const handleDelete = (productId, event) => {
    event.preventDefault();
    try{
      const updatedCart = userCart.products.filter((deletedProduct) =>{
        console.log(productId)
        console.log (deletedProduct.id)
        return deletedProduct.id !== productId})
      
     deleteProductFromCart(productId)
     const otherCart = {...userCart, products: updatedCart}
     setUserCart(otherCart)
     console.log(otherCart)
  } catch(error){
      console.error(error)
  }
  };
  const handleCheckout = async (event) =>{
    try{
        event.preventDefault()
       const cartId = userCart.id
       const finishedCart = await checkoutCart(cartId)
       navigateNew();
    } catch(error){
        console.error(error)
    }
}
 

    useEffect(() => {
      getUser(username)
        .then((results) => {
          setUser(results);
          cartData(results.id)
        })
        .catch((error) => console.error(error));
      const cartData = async (id) => {
      const cart = await getUserCart(id)
        if (cart) {
          setUserCart(cart)
        } else {
          setPay(false)
          }
        }
    }, [username])
    
    const total = userCart.products?.map((product) => {
      const cost = product.price
      subTotal += cost
        fee = 3.99;
        totalPrice = subTotal + fee;
        totalPrice = Math.round(100*totalPrice)/100;
        return totalPrice;
    })

    return (
        <div id = "cart">
            <h1 id="title">{user.username}'s Cart</h1>
            <div className="container">
            {userCart.products?.map ((product) => {
              const deletedProduct = product.id
              return(
              <div key={product.id} className= "cart-products">
                  <img src={product.imageURL} id="img" alt="user-cart"></img>
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
                <button className="remove" onClick={(event) => handleDelete(deletedProduct, event)}>Remove Item</button>
                </div>
                </div>
              )
            }
            )}
            </div>
            <div id="totals">
            <p>Subtotal: ${subTotal}.00</p>
            <p>Delivery Fee: ${fee}</p>
            <p>Total: ${total[total.length-1]}</p>
            </div>
            <div>
            {pay? (
              <button
              id="new-post-button"
              className="m-button"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            ): null}
            </div>
        </div>
    )
}
export default UserCart