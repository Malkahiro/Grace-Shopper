import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { getProducts } from "../../axios-services";
import './Admin.css'

const Admin = ({products, setProducts}) => {
useEffect(() => {
    const getResult = async () => {
        await getProducts()
        .then((newProducts) => {
            setProducts(newProducts)
    })
    }
    getResult();
}, []);

return (<div className="products-list">
<p>Products</p>
{products.map((product) =>{
    return (<div key={product.id} className="product">
        <Link to={`/editproduct/${product.id}`}><img src={product.imageURL} alt="image of product" /></Link>
        </div>)
})}
</div>)
};
export default Admin;