import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/admin.controller.js';
import { getAdminStats } from '../controllers/adminStats.controller.js';

const router = express.Router();

router.post('/register', registerAdmin);  // Optional: for creating admins
router.post('/login', loginAdmin);
router.get('/stats', getAdminStats);  // ✅ Adds /api/admin/stats

export default router;
