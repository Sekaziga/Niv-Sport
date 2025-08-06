// routes/player.routes.js
import express from 'express';
import {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from '../controllers/player.controller.js';
import upload from '../middlewares/upload.js';


const router = express.Router();

router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);
router.post('/', upload.single('image'),createPlayer);
router.put('/:id', updatePlayer);
router.delete('/:id', deletePlayer);

export default router;
