import { useEffect, useState } from 'react';
import api from '../api/axios'; // Adjust path if needed

const Media = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'image', 'video'

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
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Media Gallery</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('image')}
          className={`px-4 py-2 rounded ${filter === 'image' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Images
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`px-4 py-2 rounded ${filter === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Videos
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {filteredMedia.length === 0 && !loading ? (
          <p className="text-gray-500 col-span-full">No media available.</p>
        ) : (
          filteredMedia.map((media) => (
            <div key={media.id} className="rounded-lg shadow-md overflow-hidden bg-white">
              {media.type === 'image' ? (
                <img
                  src={`http://localhost:3001${media.url}`}

                  alt={media.title || 'Media file'}
                  className="object-cover h-60 w-full"
                />
              ) : media.type === 'video' ? (
                <video controls className="object-cover h-60 w-full">
                   <source src={`http://localhost:3001${media.url}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
              <div className="p-2">
                <p className="text-gray-800 font-medium text-sm">{media.title}</p>
                <span className="text-xs text-gray-500 italic">{media.type}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Media;
