import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { storageClient } from '../config/supabaseStorage';

const storage = multer({ storage: multer.memoryStorage() });

export const uploadImage = [
  storage.single('images'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) return next();

      const buffer = file.buffer;
      const originalName = path.extname(file.originalname);
      const fileName = `Warket-${Math.round(Math.random() * 1e9)}${originalName}`;
      const filePath = `images/${fileName}`;

      const { error } = await storageClient
        .from('warket-items')
        .upload(filePath, file.buffer, { contentType: file.mimetype });

      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }

      const { data } = storageClient
        .from('warket-items')
        .getPublicUrl(filePath);

      (req as any).filePath = filePath;
      (req as any).publicUrl = data.publicUrl;

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  },
];
