import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://exe-tracker.herokuapp.com'
});

export default Axios;
