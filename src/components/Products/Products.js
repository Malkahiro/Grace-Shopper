import React from "react";
import {Link} from 'react-router-dom'
import './Products.css'

const Products = ({products}) => {
// console.log(products);
return (<div className="products-list">
<p>Products</p>
{products.map((product) =>{
    return (<div key={product.id} className="product">
        <Link to={`/products/${product.id}`}><img src={product.imageURL} alt="image of product" /></Link>
        </div>)
})}
</div>)
};
export default Products;