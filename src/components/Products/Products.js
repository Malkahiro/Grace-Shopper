import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { getProducts } from "../../axios-services";
import './Products.css'


const Products = ({products, setProducts}) => {

// useEffect(() => {
//     getProducts()
//     .then((newProducts) => {
//         setProducts(newProducts)
//     })
// }, []);
useEffect(() => {
    const getResult = async () => {
        await getProducts()
        .then((newProducts) => {
            setProducts(newProducts)
    })
    }
    getResult();
}, []);

    const results = products.map((product) =>{
        return (<div key={product.id} className="product">
            <Link to={`/products/${product.id}`}><img src={product.imageURL} alt="image of product" /></Link>
            </div>)
    })

const content = results?.length ? results : <article><p>No Matching Posts</p></article>

return (<div className="products-list">
    {content}
</div>)
};
export default Products;