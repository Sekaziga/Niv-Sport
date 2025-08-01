// src/controllers/media.controller.js
import prisma from '../prisma.js';

import fs from 'fs';
import path from 'path';


export const getAllMedia = async (req, res) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: {
        id: 'desc' // Show newest first
      }
    });
    res.json(media);
  } catch (err) {
    console.error('Get media error:', err);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
};

export const createMedia = async (req, res) => {
  const { title, url, type } = req.body;
  try {
    const newMedia = await prisma.media.create({ 
      data: { title, url, type } 
    });
    res.json(newMedia);
  } catch (err) {
    console.error('Create media error:', err);
    res.status(500).json({ error: 'Failed to create media' });
  }
};

export const updateMedia = async (req, res) => {
  const { id } = req.params;
  const { title, url, type } = req.body;
  try {
    const updated = await prisma.media.update({
      where: { id: parseInt(id) },
      data: { title, url, type },
    });
    res.json(updated);
  } catch (err) {
    console.error('Update media error:', err);
    res.status(500).json({ error: 'Failed to update media' });
  }
};

export const deleteMedia = async (req, res) => {
  const { id } = req.params;
  try {
    // First get the media to find the file path
    const media = await prisma.media.findUnique({
      where: { id: Number(id) }
    });

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Delete from database
    await prisma.media.delete({ where: { id: Number(id) } });

    // Try to delete the physical file
    if (media.url && media.url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', media.url);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log('File deleted:', filePath);
        }
      } catch (fileError) {
        console.error('Failed to delete file:', fileError);
        // Don't fail the request if file deletion fails
      }
    }

    res.json({ message: 'Media deleted successfully' });
  } catch (err) {
    console.error('Delete media error:', err);
    res.status(500).json({ error: 'Failed to delete media' });
  }
};

export const uploadMediaFile = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, type } = req.body;
    
    // Validate required fields
    if (!title?.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    if (!type || !['image', 'video'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either "image" or "video"' });
    }

    // Create the URL path for the uploaded file
    const url = `/uploads/${req.file.filename}`;

    // Save to database using Prisma
    const newMedia = await prisma.media.create({
      data: {
        title: title.trim(),
        url,
        type,
      },
    });

    console.log('Media created successfully:', newMedia);
    
    res.status(201).json({
      message: 'Media uploaded successfully',
      media: newMedia
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded file if database save fails
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
        console.log('Cleaned up uploaded file due to error');
      } catch (unlinkError) {
        console.error('Failed to delete uploaded file:', unlinkError);
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to upload media',
      details: error.message
    });
  }
};