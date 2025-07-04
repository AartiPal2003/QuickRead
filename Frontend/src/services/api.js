

import axios from 'axios';

// Create an Axios instance for making requests
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT in headers for protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token for protected routes
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const updateUserStats = async (userId, action) => {
  try {
      const response = await axios.post(`${API_URL}/update-stats`, { userId, action });
      return response.data;
  } catch (error) {
      console.error('Error updating user stats:', error);
      return null;
  }
};

export const awardPoints = async (userId, points) => {
  try {
    const response = await fetch("http://localhost:5000/award-points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, points }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error awarding points:", error);
    throw error;
  }
};


export default api;
