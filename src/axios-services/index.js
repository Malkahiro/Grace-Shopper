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
export const getUsers = async () => {
  try {
    const response = await fetch("/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

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
export const createProduct = async (addProduct) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      product: addProduct,
    }),
  });
  const result = await response.json();
  return result;
};

export const getUser = async (username) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`api/users/${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await response.json();
    return user
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (Id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/products/products/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data
    return result;
  } catch (error) {
    console.error(error);
  }
};
export async function editProduct(
  productId,
  token,
  { name, released, description, type, format, creator, genre, isPhysical, price, imageURL }
) {
  const response = await fetch(`api/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      released: released,
      description: description,
      type: type,
      format: format,
      creator: creator,
      genre: genre,
      isPhysical: isPhysical,
      price: price,
      imageURL: imageURL,
    }),
  });
  const result = await response.json();
  return result;
}

export const getUserCart = async (id) =>{
  try{
      const response = await fetch(`/api/shopping_cart/${id}`);
      const result = await response.json();
      return result;
  } catch (error){
      console.error(error)
  }
}

export const deleteUserItem = async (productId, cartId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/shopping_cart/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data
    return result;
  } catch (error) {
    console.error(error);
  }
};