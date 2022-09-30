import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import './Admin.css'

const Admin = ({products}) => {


return (<div className="products-list">
{products.map((product) =>{
    return (<div key={product.id} className="product">
        <Link to={`/editproduct/${product.id}`}><img src={product.imageURL} alt="image of product" /></Link>
        </div>)
})}
</div>)
};
export default Admin;