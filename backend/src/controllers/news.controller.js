import prisma from '../prisma.js';


export const getAllNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

export const createNews = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newEntry = await prisma.news.create({ data: { title, content } });
    res.json(newEntry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create news' });
  }
};

export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updated = await prisma.news.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update news' });
  }
};

export const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.news.delete({ where: { id: Number(id) } });
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
};
