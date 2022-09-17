import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'




const ProductDetails = ({products}) => {
  let {id} = useParams();
  const [details, setDetails] = useState([]);
console.log(products);


  useEffect(() =>{
    const getDetails = products.map((item) =>{
      if(item.id === id){
        console.log(item);
        return setDetails(item);
      }
    })
  }, [id]);
    return ( <div>
      <h1>Single Product</h1>
      <h2>{id}</h2>
      <Link to={'/products'}>Back to products</Link>
    </div> );
}
 
export default ProductDetails;