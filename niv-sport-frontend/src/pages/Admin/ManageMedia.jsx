// src/pages/admin/ManageMedia.jsx
import { useEffect, useState } from 'react';
import api from '../../api/axios';

const ManageMedia = () => {
  const [mediaList, setMediaList] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('image');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch media on load
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await api.get('/media');
      setMediaList(res.data);
    } catch (err) {
      console.error('Error fetching media:', err);
      setError('Failed to fetch media');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!file || !title.trim()) {
      setError('Please select a file and enter a title');
      return;
    }

    // File size validation (50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    // File type validation
    const allowedTypes = {
      image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
      video: ['video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/webm']
    };

    if (!allowedTypes[type].includes(file.type)) {
      setError(`Invalid file type for ${type}. Please select a valid ${type} file.`);
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('type', type);
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await api.post('/media/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data' 
        },
        timeout: 60000, // 60 second timeout for large files
      });

      console.log('Upload response:', response.data);
      
      // Reset form
      setTitle('');
      setType('image');
      setFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      setSuccess('Media uploaded successfully!');
      
      // Refresh media list
      await fetchMedia();
      
    } catch (err) {
      console.error('Upload failed:', err);
      
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code === 'ECONNABORTED') {
        setError('Upload timeout. Please try with a smaller file.');
      } else {
        setError('Failed to upload media. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;
    
    try {
      await api.delete(`/media/${id}`);
      setMediaList(prev => prev.filter(item => item.id !== id));
      setSuccess('Media deleted successfully');
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete media');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Manage Media</h1>

      {/* Success/Error Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-4 mb-8 bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Upload New Media</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              placeholder="Enter media title"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Type *</label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={loading}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">File *</label>
          <input
            type="file"
            accept={type === 'image' ? 'image/*' : 'video/*'}
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={loading}
          />
          {file && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: {file.name} ({formatFileSize(file.size)})
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Maximum file size: 50MB. Supported formats: 
            {type === 'image' ? ' JPG, PNG, GIF, WebP' : ' MP4, MOV, AVI, MKV, WebM'}
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            '+ Upload Media'
          )}
        </button>
      </form>

      {/* Media Gallery */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Media Gallery ({mediaList.length})</h2>
        
        {mediaList.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No media uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mediaList.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  {item.type === 'image' ? (
                    <img
                      src={`http://localhost:3001${item.url}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
                      }}
                    />
                  ) : (
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      <source src={`http://localhost:3001${item.url}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate mb-2">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded capitalize">
                      {item.type}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMedia;