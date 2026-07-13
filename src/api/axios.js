import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    // Check if it's not a 404 for getting a single item (we might want to handle that differently in component)
    if (error.response?.status !== 404) {
      toast.error(message);
    }
    
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
