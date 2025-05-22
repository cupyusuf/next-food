import axios from 'axios';

const api = axios.create({
  baseURL: 'http://food-order-api.test',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
  // Gunakan FormData dan method override agar sesuai dengan backend Laravel
  const formData = new FormData();
  for (const [key, value] of food.entries()) {
    formData.append(key, value);
  }
  formData.append('_method', 'PUT');
  const response = await api.post(`/api/foods/${id}`, formData);
  return response.data;
};

export const deleteFood = async (id) => {
  await api.delete(`/api/foods/${id}`);
};

// Auth API
export const registerUser = async (user) => {
  const response = await api.post('/api/register', user);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/api/login', credentials);
  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get('/api/user');
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.put('/api/user/update', userData);
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
