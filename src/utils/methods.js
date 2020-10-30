import axios from './Api';

export const isAuthenticated = () => {
  return localStorage.getItem('__ACCESS_TOKEN');
}

export const getToken = async () => {
  const token = (await axios.post('token')).data;
  localStorage.setItem('__ACCESS_TOKEN', token);
}


