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

export const getUserCart = async () =>{
  try{
    const token = localStorage.getItem("token");
      const response = await fetch(`/api/shopping_cart/`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }});
      const result = await response.json();
      return result;
  } catch (error){
      console.error(error)
  }
}

export const addProductToCart = async (product) => {
  const token = localStorage.getItem("token");
  if (!token) {
    const cart = localStorage.getItem("products")
    if (cart) {
      const cartProducts = JSON.parse(cart)
      cartProducts.push(product)
      localStorage.setItem("products", JSON.stringify(cartProducts))
    } else {
      localStorage.setItem("products", JSON.stringify([product]))
    } return;
  }
  const response = await fetch(`/api/shopping_cart/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      productId: product.id
    }),
  });
  const result = await response.json();
  return result;
};

export const deleteProductFromCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      const cart = localStorage.getItem("products")
        const cartProducts = JSON.parse(cart)
        const newProducts = cartProducts.filter(product => (product.id !== productId))
        localStorage.setItem("products", JSON.stringify(newProducts))
       return;
    }
    const response = await fetch(`/api/shopping_cart/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId
      }),
    });
    const result = response.data
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const checkoutCart = async (cartId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("products")
      return;
    }
    const response = await fetch(`/api/shopping_cart/${cartId}`, {
      method: "PATCH",
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
export async function updateProductQuantity(cartId, productId, quantity) {
  const response = await fetch(`api/products/${cartId}/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer `,
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  });
  const result = await response.json();
  return result;
}