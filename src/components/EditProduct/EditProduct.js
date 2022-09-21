import React from 'react'

const EditProduct = (props) => {
    const detailedProduct = props.detailedProduct;
    return ( <div className="single-product">
        <h1>{detailedProduct.name}</h1>
        <h2>{detailedProduct.creator}</h2>
        <img src={detailedProduct.imageURL} alt="detailed picture" />
        <p>{detailedProduct.price}</p>
        <p>{detailedProduct.released}</p>
    </div> );
}
 
export default EditProduct;