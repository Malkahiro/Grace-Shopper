import React from "react";
import {Link, useParams} from 'react-router-dom'
import SingleProduct from "./SingleProduct";




const ProductDetails = ({products}) => {
  let {id} = useParams();
  id = Number(id);
const detailedProduct = products.filter((product) => {
  return product.id === id
});

console.log(detailedProduct);

    return ( <div>
     {detailedProduct?.length && <SingleProduct detailedProduct={detailedProduct[0]} />}
      <Link to={'/products'}>Back to products</Link>
    </div> );
}
 
export default ProductDetails;