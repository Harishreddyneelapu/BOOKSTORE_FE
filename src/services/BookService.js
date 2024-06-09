import axios from 'axios';

const config = {
  'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`,
}

export const getAllBooksApiCall = async () => {
    const res = await axios.get("http://localhost:3000/api/books", { headers: config })
    return res;
  }