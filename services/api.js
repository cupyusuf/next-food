import axios from 'axios';

const api = axios.create({
  baseURL: 'http://food-order-api.test',
});

// Foods API
export const getFoods = async () => {
  const response = await api.get('/api/foods');
  return response.data;
};

export const createFood = async (food) => {
  const response = await api.post('/api/foods', food);
  return response.data;
};

export const getFoodById = async (id) => {
  const response = await api.get(`/api/foods/${id}`);
  return response.data;
};

export const updateFood = async (id, food) => {
  const response = await api.put(`/api/foods/${id}`, food);
  return response.data;
};

export const deleteFood = async (id) => {
  await api.delete(`/api/foods/${id}`);
};

// Auth API
export const registerUser = async (user) => {
  const response = await api.post('/api/auth/register', user);
  return response.data;
};

// Orders API
export const placeOrder = async (order) => {
  const response = await api.post('/api/orders', order);
  return response.data;
};

export const initiatePayment = async (id) => {
  const response = await api.post(`/api/orders/${id}/pay`);
  return response.data;
};
