import React from "react";
import {Link, useParams} from 'react-router-dom'
import EditProduct from "./EditProduct";

const EditDetails = ({products, setProducts }) => {
  let {id} = useParams();
  id = Number(id);
const detailedProduct = products.filter((product) => {
  return product.id === id
});

    return ( <div>
     {detailedProduct?.length && <EditProduct detailedProduct={detailedProduct[0]} setProducts={setProducts} />}
      <Link to={'/admin'}>Back to products</Link>
    </div> );
}
 
export default EditDetails;