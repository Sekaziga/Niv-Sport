import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../api/axios';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    newsCount: 0,
    eventCount: 0,
    mediaCount: 0,
    playerCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout();
          navigate('/admin/login');
        } else {
          console.error('Failed to load stats', err);
        }
      }
    };

    fetchStats();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700">Total News</h2>
          <p className="text-2xl font-bold text-blue-500">{stats.newsCount}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700">Events</h2>
          <p className="text-2xl font-bold text-blue-500">{stats.eventCount}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700">Media Files</h2>
          <p className="text-2xl font-bold text-blue-500">{stats.mediaCount}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700">Players</h2>
          <p className="text-2xl font-bold text-blue-500">{stats.playerCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
