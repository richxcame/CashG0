import axios from 'axios';
import {API_BASE_URL} from '@env';

const api = axios.create({
  headers: {
    Bearer: API_BASE_URL,
  },
});

export default api;
