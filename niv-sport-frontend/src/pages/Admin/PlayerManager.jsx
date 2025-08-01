import { useEffect, useState } from 'react';
import {
  fetchPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from '../../api/players';
import PlayerForm from '../../components/PlayerForm';

const PlayerManager = () => {
  const [players, setPlayers] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadPlayers = async () => {
    const res = await fetchPlayers();
    setPlayers(res.data);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const handleSave = async (player) => {
    if (editing) {
      await updatePlayer(editing.id, player);
    } else {
      await createPlayer(player);
    }
    setEditing(null);
    loadPlayers();
  };

  const handleDelete = async (id) => {
    await deletePlayer(id);
    loadPlayers();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Player Manager</h1>
      <PlayerForm onSubmit={handleSave} initialData={editing} />
      <table className="min-w-full mt-6 border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Number</th>
            <th className="p-2">Nationality</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.position}</td>
              <td className="p-2">{p.number}</td>
              <td className="p-2">{p.nationality}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => setEditing(p)}
                  className="bg-yellow-400 px-2 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerManager;
