import axios from 'axios';


const config = {
  'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
}


export const getAllBooksApiCall = async () => {
  const res = await axios.get("http://localhost:3000/api/books", { headers: config })
  return res.data.data;
}

export const getBookByIdApiCall = async (_id) => {
  const res = await axios.get(`http://localhost:3000/api/books/${_id}`, { headers: config });
  return res;
}

export const getCartDetailsApiCall = async (token) => {
  const res = await axios.get("http://localhost:3000/api/cart", {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  if(res?.data?.data){
    return res.data.data.books
  }else{
    return [];
  }
  
}

export const addCartList = async (_id) => {
  const res = await axios.post(`http://localhost:3000/api/cart/add/${_id}`, "", { headers: config });
  return res;
}

export const updateCartList = async (_id, quantity) => {
  const res = await axios.put(`http://localhost:3000/api/cart/update/${_id}`, { quantity: quantity }, { headers: config });
  return res;
}
export const removeCartList = async (_id) => {
  const res = await axios.post(`http://localhost:3000/api/cart/remove/${_id}`, "", { headers: config });
  return res;
}
export const getAddressDetailsApiCall = async () => {
  const res = await axios.post("http://localhost:3000/api/customer", "", { headers: config });
  return res;
}

export const getOrderDetailsApiCall = async (token) => {
  const res = await axios.post("http://localhost:3000/api/order", "", { headers:  {
    'Authorization': `Bearer ${token}`,
  } });
  return res;
}

export const getWishListDetailsApiCall = async (token) => {
  const res = await axios.get("http://localhost:3000/api/wishlist", { headers: {
    'Authorization': `Bearer ${token}`,
  } });
  if(res?.data?.data){
    return res.data.data.books
  }else{
    return [];
  }
  
}

export const addWishList = async (_id) => {
  const res = await axios.post(`http://localhost:3000/api/wishlist/add/${_id}`, "", { headers: config });
  return res;
}

export const removeWishlistItem = async (_id) => {
  const res = await axios.post(`http://localhost:3000/api/wishlist/remove/${_id}`, "", { headers: config });
  return res;
}