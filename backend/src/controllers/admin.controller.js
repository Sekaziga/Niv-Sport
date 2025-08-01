import prisma from '../prisma.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const admin = await prisma.admin.create({
      data: { username, email, password: hashedPassword },
    });
    res.status(201).json({ message: 'Admin registered', admin: { id: admin.id, username: admin.username } });
  } catch (err) {
    res.status(400).json({ error: 'Failed to register admin' });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return res.status(404).json({ error: 'Admin not found' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ message: 'Login successful', token });
};
