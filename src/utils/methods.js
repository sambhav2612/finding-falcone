import axios from './Api';

export const isAuthenticated = () => {
  return localStorage.getItem('__ACCESS_TOKEN');
}

export const getToken = async () => {
  const token = (await axios.post('token')).data?.token;
  localStorage.setItem('__ACCESS_TOKEN', token);
}

export const getPlanets = async () => {
  return (await axios.get('planets')).data;
}

export const getVehicles = async () => {
  return (await axios.get('vehicles')).data;
}


