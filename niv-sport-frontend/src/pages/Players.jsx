import { useEffect, useState } from 'react';
import { fetchPlayers } from '../api/players';

const Players = () => {
  const [Players, setPlayers] = useState([]);
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchPlayers();
        setPlayers(res.data);
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Players</h1>
      {Object.keys(grouped).map((position) => (
        <div key={position} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">{position}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {grouped[position].map((player) => (
              <div key={player.id} className="bg-white shadow-md rounded-2xl p-4 text-center">
                {player.image && (
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-32 h-32 object-cover mx-auto rounded-full mb-4"
                  />
                )}
                <h3 className="text-lg font-bold">{player.name}</h3>
                <p className="text-sm text-gray-500">#{player.number}</p>
                <p className="text-sm text-gray-400">{player.nationality}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Players;
