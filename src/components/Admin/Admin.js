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

//admin edit products
// export async function adminEditProduct(productName, productCreator, productPrice, productReleased) {
// 	try {
// 		return fetch(`${BASE_URL}/products/${productId}`, {
// 			method: "PATCH",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				name: productName,
// 				creator: productCreator,
// 				price: productPrice,
// 				released: productReleased,
			
// 			}),
// 		})
// 			.then((response) => response.json())
// 			.then((result) => {
// 				return result;
// 			});
// 	} catch (error) {
// 		console.error(error)
// 	}
// }