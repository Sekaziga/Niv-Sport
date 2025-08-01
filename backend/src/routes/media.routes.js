// routes/media.routes.js
import express from 'express';
import {
  getAllMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  uploadMediaFile,
} from '../controllers/media.controller.js';

import upload, { handleMulterError } from '../middlewares/upload.js';

const router = express.Router();

// Get all media
router.get('/', getAllMedia);

// Upload media file with multer middleware
router.post('/upload', upload.single('file'), uploadMediaFile, handleMulterError);

// Create media (for manual entries)
router.post('/', createMedia);

// Update media
router.put('/:id', updateMedia);

// Delete media
router.delete('/:id', deleteMedia);

export default router;