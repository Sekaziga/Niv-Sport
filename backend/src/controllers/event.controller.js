import prisma from '../prisma.js';


export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const createEvent = async (req, res) => {
  const { name, description, date } = req.body;
  try {
    const newEvent = await prisma.event.create({ data: { name, description, date: new Date(date) } });
    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, date } = req.body;
  try {
    const updated = await prisma.event.update({
      where: { id: Number(id) },
      data: { name, description, date: new Date(date) },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({ where: { id: Number(id) } });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
