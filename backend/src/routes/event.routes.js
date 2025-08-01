import express from 'express';
import { getAllEvents, createEvent,updateEvent, deleteEvent } from '../controllers/event.controller.js';
const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
