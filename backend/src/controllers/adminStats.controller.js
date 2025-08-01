import prisma from '../prisma.js';



export const getAdminStats = async (req, res) => {
  try {
    console.log("Fetching stats...");

    const newsCount = await prisma.news.count();
    console.log("News count:", newsCount);

    const eventCount = await prisma.event.count();
    console.log("Event count:", eventCount);

    const mediaCount = await prisma.media.count();
    console.log("Media count:", mediaCount);
    const playerCount = await prisma.player.count();
    console.log("Player count:", playerCount);

    res.json({ newsCount, eventCount, mediaCount , playerCount });
  } catch (err) {
    console.error('❌ Error in getAdminStats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
