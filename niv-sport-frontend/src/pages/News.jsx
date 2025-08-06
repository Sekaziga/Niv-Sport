// src/pages/News.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/news');
        setNews(response.data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">
          Latest News & Updates
        </h2>

        {loading && (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        )}
        {error && (
          <div className="text-center text-red-600 font-medium">{error}</div>
        )}

        {!loading && news.length === 0 && (
          <p className="text-center text-gray-500">No news articles available.</p>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-gray-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-4">{item.content}</p>
              <div className="text-sm text-gray-400">
                {new Date(item.created_at).toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
