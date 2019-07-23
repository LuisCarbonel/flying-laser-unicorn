const axios = require('axios');
const URL = 'http://localhost:3000'
const api = axios.create({
  baseURL: URL,
});


export const fetchEateries = async () => {
  await axios.get(`${URL}/restaurants`);
}
export const fetchComments = async (id) => {
  await api.get(`/restaurants/${id}/comments`);
}
export const eateryInfo = async (id) => {
  const resp = await api.get(`/restaurants/${id}`);
  return resp.data;
}
export const updateEatery = async (data) => {
  const { id, ...eateryData } = data;
  await api.put(`/restaurants/${id}`, eateryData)
}
export const updateComment = async (data) => {
  const { id, ...commentData } = data;
  await api.put(`comments/${id}`, commentData)
}
export const createEatery = async (eatery) => {
  console.log('doesthiswork')
  const resp = await api.post(`/restaurants`, eatery);
  return resp.data
}
export const createComment = async (newComment) => {
  const resp = await api.post(`/comments`, newComment)
  return resp.data;
}
export const storeToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}
export const createUser = async (userData) => {
  const resp = await axios.post(`${URL}/users`, userData);
  storeToken(resp.data.token)
}
export const loginUser = async (name, password) => {
  const resp = await api.post(`/users/login`, { name, password });
  storeToken(resp.data.token);
  return resp;
}




