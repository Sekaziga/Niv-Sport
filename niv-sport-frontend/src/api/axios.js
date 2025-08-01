import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});
// Automatically logout on token expiration (401/403)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
