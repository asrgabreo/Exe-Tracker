import axios from 'axios';

let API_ROOT = 'http://localhost:5000';

if(process.env.NODE_ENV === 'production'){
  API_ROOT = 'https://exe-tracker.herokuapp.com'
}


const Axios = axios.create({
  baseURL: API_ROOT
});

export default Axios;
