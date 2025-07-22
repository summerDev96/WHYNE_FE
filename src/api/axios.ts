import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://winereview-api.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: false,
  },
});

export default instance;
