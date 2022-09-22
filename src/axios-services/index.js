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
};

// export const getUser = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await fetch(`users/me`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

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
