import express from 'express';
import { getAllNews, createNews, updateNews, deleteNews} from '../controllers/news.controller.js';
const router = express.Router();

router.get('/', getAllNews);
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router;
