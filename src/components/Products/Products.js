import React from "react";
import {Link} from 'react-router-dom'
import './Products.css'

const Products = ({products}) => {
    const results = products.map((product) =>{
        return (<div key={product.id} className="product">
            <Link to={`/products/${product.id}`}><img src={product.imageURL} alt="iproduct" /></Link>
            </div>)
    })

const content = results?.length ? results : <article><p>No Matching Posts</p></article>

return (<div className="products-list">
    {content}
</div>)
};
export default Products;