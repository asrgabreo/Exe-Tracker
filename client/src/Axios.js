import axios from 'axios';

const API_ROOT = import.meta.env.VITE_API_ROOT || (import.meta.env.PROD ? '' : 'http://localhost:5000');

const Axios = axios.create({
  baseURL: API_ROOT
});

export default Axios;
