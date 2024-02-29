import axios, { AxiosInstance } from 'axios';

// Create an Axios instance with the baseURL and default headers set
const baseUrl: AxiosInstance = axios.create({
  baseURL: 'http://a3c5e9cd58a734f708a2266883d8c41c-287846994.il-central-1.elb.amazonaws.com:8088',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


baseUrl.defaults.timeout = 180000; // Axios configuration for timeout


export default baseUrl;
