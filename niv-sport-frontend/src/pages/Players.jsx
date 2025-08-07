import { useEffect, useState } from 'react';
import { fetchPlayers } from '../api/players';

const Players = () => {
  const [grouped, setGrouped] = useState({});
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchPlayers();
        groupByPosition(res.data);
      } catch (err) {
        console.error('Failed to fetch players', err);
      }
    };
    getData();
  }, []);

  const groupByPosition = (players) => {
    const groupedData = players.reduce((acc, player) => {
      const key = player.position || 'Unknown';
      if (!acc[key]) acc[key] = [];
      acc[key].push(player);
      return acc;
    }, {});
    setGrouped(groupedData);
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-sky-400">Our Players</h1>

        {Object.keys(grouped).map((position) => (
          <div key={position} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-sky-300">{position}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {grouped[position].map((player) => (
                <div
                  key={player.id}
                  className="bg-white text-blue-900 shadow-lg rounded-2xl p-6 text-center transition hover:shadow-2xl hover:-translate-y-1 duration-300"
                >
                  {player.image && (
                    <img
                      src={`${imageBaseUrl}/uploads/${player.image}`}
                      alt={player.name}
                      className="w-32 h-32 object-cover mx-auto rounded-full mb-4 border-4 border-sky-500"
                    />
                  )}
                  <h3 className="text-xl font-bold mb-1">{player.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">#{player.number}</p>
                  <p className="text-sm text-gray-500 italic">{player.nationality}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
