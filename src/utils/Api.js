import axios from 'axios';
import {isAuthenticated} from "./methods";

const http = axios.create({
  baseURL: 'https://findfalcone.herokuapp.com/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

http.interceptors.request.use(function (config) {
  config.headers.Authorization = isAuthenticated();
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default http;
