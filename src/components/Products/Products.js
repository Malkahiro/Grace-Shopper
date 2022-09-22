import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { getProducts } from "../../axios-services";
import './Products.css'

const Products = ({products, setProducts}) => {
// console.log(products);
useEffect(() => {
    getProducts()
    .then((newProducts) => {
        setProducts(newProducts)
    })
}, []);
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