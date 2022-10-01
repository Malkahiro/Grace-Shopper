import React from "react";
import {Link} from 'react-router-dom'
import './Admin.css'

const Admin = ({products}) => {


return (<div className="products-list">
<p>Products</p>
{products.map((product) =>{
    return (<div key={product.id} className="product">
        <Link to={`/editproduct/${product.id}`}><img src={product.imageURL} alt="product" /></Link>
        </div>)
})}
</div>)
};
export default Admin;