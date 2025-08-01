import { useEffect, useState } from 'react';
import api from '../api/axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Events & Tournaments</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-600">No events available at the moment.</p>
      ) : (
        <ul className="space-y-6">
          {events.map((event) => (
            <li key={event.id || event._id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
              <p className="text-gray-600">
                {new Date(event.date).toLocaleDateString()} – {event.location || 'Location TBA'}
              </p>
              <p className="mt-2 text-gray-700">{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
