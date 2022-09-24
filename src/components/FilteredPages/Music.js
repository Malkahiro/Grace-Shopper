import React from "react";
import {Link} from 'react-router-dom'

const Music = ({products}) => {
    console.log(products);
        const filteredResults = products.filter((product) => product.type === 'music')
const results = filteredResults.map((product) =>{
        return (<div key={product.id} className="product">
            <Link to={`/products/${product.id}`}><img src={product.imageURL} alt="image of product" /></Link>
            </div>)
    })

const content = results?.length ? results : <article><p>No Matching Posts</p></article>

    return ( 
        <div className="products-list">
    {content}
</div>
     );

}
 
export default Music;
