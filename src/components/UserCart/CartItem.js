import React, {useState, useEffect} from "react"
import { updateProductQuantity } from "../../axios-services";

const Cartitem = (props) => {
const product = props.product;
const handleDelete = props.handleDelete
const cartId = props.cartId
const [isQuantity, setIsQuantity] = useState (product.quantity)

const deletedProduct = product.id
useEffect(() => {
    setIsQuantity(product.quantity) 
}, [product])

const handleQuantity = (event) => {
event.preventDefault()
    updateProductQuantity(cartId, product.id, isQuantity)
    props.updateCart(product.id, isQuantity)
}
return(
<div key={product.id} className= "cart-products">
    <img src={product.imageURL} id="img" alt="user-cart"></img>
  <div>
  <h3>{product.name}</h3>
  <p>${product.price}.00</p>
  <p>{product.creator}</p>
  <label className="postTitles">Quantity: {product.quantity}</label>
<br />
<input
onChange={(event) => {
    setIsQuantity(event.target.value);
  }}
value={isQuantity}
size={"3"}
min="1"
type="number"
title="name"
required
/>
  <div id = "quantity">
  <button id = "update-quantity" className="btn" onClick={(event) => handleQuantity(event)}>Update Quantity</button>
  </div>
  <br />
  <button className="remove" onClick={(event) => handleDelete(deletedProduct, event)}>Remove Item</button>
  </div>
  </div>
)
}
export default Cartitem;