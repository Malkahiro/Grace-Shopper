import React from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../axios-services';

const EditProduct = (props) => {
    const detailedProduct = props.detailedProduct;
    const setProducts= props.setProducts
    const navigate = useNavigate();
    const navigateNew = () => {
        navigate("/admin");
      };
    const handleSubmit = async (event) => {
        try{
            navigateNew();
        } catch (error) {
            console.error(error)
        }
    }

    const removeProduct = async (detailedProduct) => {
          await deleteProduct(detailedProduct.id)
          await getProducts()
            .then((results) => {
             setProducts(results);
              navigateNew();
            })
            .catch((error) => console.error(error));
      };

    
    return ( <div className="single-product">
        <form id="edit-product" onSubmit={handleSubmit}>
        <h1>{detailedProduct.name}</h1>
        <h2>{detailedProduct.creator}</h2>
        <img src={detailedProduct.imageURL} alt="detailed picture" />
        <p>{detailedProduct.price}</p>
        <p>{detailedProduct.released}</p>
        </form>
        <button className="m-button" id="delete-btn" onClick={() => removeProduct(detailedProduct)}>
                Delete
              </button>
              
    </div> );
}
 
export default EditProduct;