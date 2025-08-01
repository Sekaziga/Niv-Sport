import { useEffect, useState } from 'react';
import api from '../../api/axios';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', date: '', description: '' });

  // ✅ Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ✅ Add event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await api.post('/events', formData);
      setEvents((prev) => [...prev, res.data]);
      setFormData({ name: '', date: '', description: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding event:', error);
    } finally {
      setAdding(false);
    }
  };

  // ✅ Delete event
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // ✅ Start editing
  const startEdit = (event) => {
    setEditingId(event.id);
    setFormData({ name: event.name, date: event.date.slice(0, 10), description: event.description });
  };

  // ✅ Update event
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/events/${editingId}`, formData);
      setEvents((prev) =>
        prev.map((ev) => (ev.id === editingId ? res.data : ev))
      );
      setEditingId(null);
      setFormData({ name: '', date: '', description: '' });
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Manage Events</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        onClick={() => {
          setShowAddForm((prev) => !prev);
          setFormData({ name: '', date: '', description: '' });
          setEditingId(null);
        }}
      >
        {showAddForm ? 'Cancel' : '+ Add Event'}
      </button>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAddEvent} className="bg-gray-100 p-4 rounded mb-6">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 mr-2 mb-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="date"
            className="border p-2 mr-2 mb-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 mr-2 mb-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Add Event'}
          </button>
        </form>
      )}

      {/* Loading */}
      {loading && <p>Loading events...</p>}

      {/* Events List */}
      {events.map((event) => (
        <div key={event.id} className="bg-white p-4 rounded shadow mb-4">
          {editingId === event.id ? (
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border p-2 w-full"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="border p-2 w-full"
              />
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border p-2 w-full"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-gray-500">Date: {event.date.slice(0, 10)}</p>
              <p className="text-gray-500">Description: {event.description}</p>
              <div className="space-x-4 mt-2">
                <button
                  onClick={() => startEdit(event)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageEvents;
