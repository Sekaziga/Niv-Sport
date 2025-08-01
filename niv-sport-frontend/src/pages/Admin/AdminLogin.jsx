import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // ✅ custom Axios instance

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // ✅ navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        '/admin/login',
        { email, password },
        { withCredentials: true }
      );

      const token = res.data.token;

      // ✅ Save token
      localStorage.setItem('adminToken', token);

      // ✅ Optional: attach token to all future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setSuccess('Login successful');
      setError('');

      // ✅ Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded w-80">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
