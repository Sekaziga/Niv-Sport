import prisma from '../prisma.js';


// 🔍 Get all players
export const getAllPlayers = async (req, res) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};

// 🔍 Get one player by ID
export const getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await prisma.player.findUnique({
      where: { id: Number(id) },
    });
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch player' });
  }
};

// 🆕 Create a new player


export const createPlayer = async (req, res) => {
  try {
    const { name, position, number, nationality } = req.body;
    const image = req.file ? req.file.filename : null;

    const player = await prisma.player.create({
      data: {
        name,
        position,
        number: parseInt(number),
        nationality,
        image,
      },
    });

    res.status(201).json(player);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Failed to create player' });
  }
};

// 📝 Update a player by ID
export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPlayer = await prisma.player.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update player' });
  }
};

// ❌ Delete a player
export const deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.player.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete player' });
  }
};
