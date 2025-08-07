import { useEffect, useState } from 'react';
import api from '../api/axios';

const Media = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const mediaBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await api.get('/media');
        setMediaItems(response.data);
      } catch (err) {
        console.error('Error fetching media:', err);
        setError('Failed to load media gallery.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const filteredMedia = mediaItems.filter((item) =>
    filter === 'all' ? true : item.type === filter
  );

  return (
    <div className="min-h-screen bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-sky-400">Media Gallery</h2>

        <div className="flex justify-center gap-4 mb-10">
          {['all', 'image', 'video'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-full font-semibold transition duration-200 ${
                filter === type
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-white text-blue-900 hover:bg-sky-100'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {loading && <p className="text-center text-sky-200">Loading media...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {filteredMedia.length === 0 && !loading ? (
            <p className="text-sky-200 col-span-full text-center">No media available.</p>
          ) : (
            filteredMedia.map((media) => (
              <div
                key={media.id || media._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl hover:-translate-y-1 duration-300"
              >
                {media.type === 'image' ? (
                  <img
                    src={`${mediaBaseUrl}${media.url}`}
                    alt={media.title || 'Media file'}
                    className="object-cover h-60 w-full"
                  />
                ) : media.type === 'video' ? (
                  <video controls className="object-cover h-60 w-full">
                    <source src={`${mediaBaseUrl}${media.url}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
                <div className="p-4 text-blue-900">
                  <p className="font-semibold text-sm mb-1">{media.title}</p>
                  <span className="text-xs text-gray-500 italic">{media.type}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Media;
