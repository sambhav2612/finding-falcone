import axios from './Api';

export const isAuthenticated = () => {
  return localStorage.getItem('__ACCESS_TOKEN');
}

export const getToken = async () => {
  const token = (await axios.post('token'))?.data?.token;
  localStorage.setItem('__ACCESS_TOKEN', token);
}

export const getPlanets = async () => {
  return (await axios.get('planets'))?.data;
}

export const getVehicles = async () => {
  return (await axios.get('vehicles'))?.data;
}

export const find = async (payload) => {
  const response = (await axios.post('find', payload))?.data;
  if (response?.status === "success") {
    window.location.replace(`/result?planet=${response?.planet_name}&status=success`)
  } else {
    window.location.replace(`/result?error=${response?.error}&status=error`)
  }
}


