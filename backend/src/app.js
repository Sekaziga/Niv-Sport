import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import playerRoutes from './routes/player.routes.js';
import adminRoutes from './routes/admin.routes.js';
import newsRoutes from './routes/news.routes.js';
import eventRoutes from './routes/event.routes.js';
import mediaRoutes from './routes/media.routes.js';
import contactRoutes from './routes/contact.routes.js';
import adminStatsRoutes from './routes/adminStats.routes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use('/api/players', playerRoutes);
app.use('/uploads', express.static('src/uploads')); // Serve static files
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/uploads', express.static('public/uploads'));




export default app;
