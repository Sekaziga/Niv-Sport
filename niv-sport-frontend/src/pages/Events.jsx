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
    <div className="min-h-screen bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-sky-400">
          Events & Tournaments
        </h2>

        {loading ? (
          <p className="text-center text-sky-200">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-sky-200">No events available at the moment.</p>
        ) : (
          <div className="space-y-8">
            {events.map((event) => (
              <div
                key={event.id || event._id}
                className="bg-white text-blue-900 rounded-xl shadow-lg p-6 transition hover:shadow-2xl hover:-translate-y-1 duration-300"
              >
                <h3 className="text-2xl font-semibold text-sky-600">{event.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(event.date).toLocaleDateString()} — {event.location || 'Location TBA'}
                </p>
                <p className="mt-3 text-gray-800">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
