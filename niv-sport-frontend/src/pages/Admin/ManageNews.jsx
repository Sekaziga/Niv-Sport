import { useEffect, useState } from 'react';
import api from '../../api/axios';

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await api.get('/news');
      setNews(res.data);
    } catch (err) {
      console.error('Failed to fetch news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/news', formData);
      setNews([...news, res.data]);
      setFormData({ title: '', content: '' });
    } catch (err) {
      console.error('Failed to add news:', err);
    }
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/news/${editingId}`, formData);
      setNews(news.map((n) => (n.id === editingId ? res.data : n)));
      setEditingId(null);
      setFormData({ title: '', content: '' });
    } catch (err) {
      console.error('Failed to update news:', err);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    try {
      await api.delete(`/news/${id}`);
      setNews(news.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Failed to delete news:', err);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData({ title: item.title, content: item.content });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Manage News</h1>

      {/* Form */}
      <form
        onSubmit={editingId ? handleUpdateNews : handleAddNews}
        className="bg-gray-100 p-4 rounded mb-6 grid gap-3 md:grid-cols-3"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded"
          required
        />
        <input
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Update' : 'Add News'}
        </button>
      </form>

      {/* News List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-3">
          {news.map((item) => (
            <li
              key={item.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.content}</p>
              </div>
              <div className="space-x-2 text-sm">
                <button
                  onClick={() => startEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteNews(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageNews;
