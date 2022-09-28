import React, {useState} from 'react';
import { addProductToCart } from '../../axios-services';

const SingleProduct = (props) => {
    const {detailedProduct} = props;
const handleSubmit = async (event) =>{
    try{
        event.preventDefault()
        await addProductToCart(detailedProduct.id)
    } catch(error){
        console.error(error)
    }
}

    return ( <div className="single-product">
        <h1>{detailedProduct.name}</h1>
        <h2>{detailedProduct.creator}</h2>
        <img src={detailedProduct.imageURL} alt="detailed picture" />
        <p>{detailedProduct.price}</p>
        <p>{detailedProduct.released}</p>
        <button onClick={handleSubmit}>Add To Cart</button>
    </div> );
}
 
export default SingleProduct;