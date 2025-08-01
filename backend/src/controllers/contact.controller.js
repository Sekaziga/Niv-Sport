import prisma from '../prisma.js';


export const getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

export const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = await prisma.contact.create({ data: { name, email, message } });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
};
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;
  try {
    const updated = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: { name, email, message },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contact.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

