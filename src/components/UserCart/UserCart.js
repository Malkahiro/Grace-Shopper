import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserCart.css"
import { getUser, getUserCart, deleteProductFromCart, checkoutCart } from '../../axios-services'
import Cartitem from "./CartItem";


const UserCart = (props) => {
  let subTotal = 0;
  let totalPrice = 0;
  let fee = 0;
    const username = props.username;
    const [userCart, setUserCart] = useState({products:[]});
    const [pay, setPay] = useState(true);
    const navigate = useNavigate();
  const navigateNew = () => {
    navigate("/success");
  };
  

  useEffect(() => {

  }, [userCart])
  const handleDelete = (productId, event) => {
    event.preventDefault();
    try{
      const updatedCart = userCart.products.filter((deletedProduct) =>{
        return deletedProduct.id !== productId})
      
     deleteProductFromCart(productId)
     const otherCart = {...userCart, products: updatedCart}
     setUserCart(otherCart)
  } catch(error){
      console.error(error)
  }
  };
  const handleCheckout = async (event) =>{
    try{
        event.preventDefault()
       const cartId = userCart.id
       await checkoutCart(cartId)
       navigateNew();
    } catch(error){
        console.error(error)
    }
}
 const updateCart = (productId, quantity) => {
  const updatedProducts = userCart.products.map((product) => {
    if (product.id === productId) {
      product.quantity = quantity;
    }
    return product;
  })
  const otherCart = {...userCart, products: updatedProducts}
  setUserCart(otherCart)
 }

    useEffect(() => {
      getUser(username)
        .then((results) => {
          cartData(results)
        })
        .catch((error) => console.error(error));
      const cartData = async (results) => {
        if (results?.id) {
          const cart = await getUserCart(results.id)
        if (cart) {
          setUserCart(cart)
        } else {
          setPay(false)
          }
        } else {
          const cart = localStorage.getItem("products")
          if (cart) {
            const cartProducts = JSON.parse(cart)
            setUserCart({products: cartProducts})
          } else {
            setPay(false)
          }
        }
        }
    }, [username])
    
    const total = userCart.products?.map((product) => {
      const cost = (product.price * product.quantity)
      subTotal += cost
      console.log(cost)
        fee = 3.99;
        totalPrice = subTotal + fee;
        totalPrice = Math.round(100*totalPrice)/100;
        return totalPrice;
    })

    return (
        <div id = "cart">
            <h1 id="title">{username || "Guest"}'s Cart</h1>
            <div>
            {userCart.products?.map ((product) => {
              console.log(userCart)
              return <Cartitem product={product} handleDelete={handleDelete} cartId={userCart.id} updateCart={updateCart}></Cartitem>
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