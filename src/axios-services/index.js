import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}


export const getProducts = async () =>{
  try{
      const response = await fetch('/api/products');
      const result = await response.json();
      return result;
  } catch (error){
      console.error(error)
  }
}

export const getProductId = async ({Id}) =>{
  try{
    const response = await fetch(`/api/products/${Id}`);
    const result = await response.json();
    return result;
  } catch (error){
    console.error(error)
  }
}