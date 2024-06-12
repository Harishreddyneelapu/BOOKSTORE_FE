import axios from 'axios';

const config = {
  'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`,
}

export const getAllBooksApiCall = async () => {
  const res = await axios.get("http://localhost:3000/api/books", { headers: config })
  return res;
}

export const getBookByIdApiCall = async (_id) => {
  const res = await axios.get(`http://localhost:3000/api/books/${_id}`, { headers: config });
  return res;
}

export const getCartDetailsApiCall = async () => {
  const res = await axios.get("http://localhost:3000/api/cart", { headers: config });
  return res;
}

export const getAddressDetailsApiCall = async () => {
  const res = await axios.post("http://localhost:3000/api/customer", "", { headers: config });
  return res;
}

export const getOrderDetailsApiCall = async () => {
  const res = await axios.post("http://localhost:3000/api/order", "", { headers: config });
  return res;
}

export const getWishListDetailsApiCall = async () => {
  const res = await axios.get("http://localhost:3000/api/wishlist", { headers: config });
  return res;
}