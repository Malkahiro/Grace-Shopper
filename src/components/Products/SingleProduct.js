import React from 'react';
import { useNavigate } from "react-router-dom";
import { addProductToCart } from '../../axios-services';
import './SingleProduct.css'

const SingleProduct = (props) => {
    const {detailedProduct} = props;
    const navigate = useNavigate();
    const navigateNew = () => {
      navigate("/products");
    };


const handleSubmit = async (event) =>{
    try{
        event.preventDefault()
        await addProductToCart(detailedProduct)
        alert(detailedProduct.name, " Added To Cart")
        navigateNew()
    } catch(error){
        console.error(error)
    }
}

    return ( <div className="single-product">
        <h1>{detailedProduct.name}</h1>
        <h2>By: {detailedProduct.creator}</h2>
        <img src={detailedProduct.imageURL} alt="detailed" />
        <p>${detailedProduct.price}</p>
        <p>Released in {detailedProduct.released}</p>
        <button onClick={handleSubmit}>Add To Cart</button>
    </div> );
}
 
export default SingleProduct;