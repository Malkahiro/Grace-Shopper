import React from "react";
import {Link, useParams} from 'react-router-dom'
import SingleProduct from "./SingleProduct";
import './ProductDetails.css'




const ProductDetails = ({products}) => {
  let {id} = useParams();
  id = Number(id);
const detailedProduct = products.filter((product) => {
  return product.id === id
});

    return ( 
    <div className="details">
     {detailedProduct?.length && <SingleProduct detailedProduct={detailedProduct[0]} />}
      <Link to={'/products'}>Back to products</Link>
    </div> );
}
 
export default ProductDetails;