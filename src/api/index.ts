import axios, { AxiosInstance } from 'axios';

// Create an Axios instance with the baseURL and default headers set
const baseUrl: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

baseUrl.defaults.timeout = 180000; // Axios configuration for timeout

export default baseUrl;
