import { NextFunction, Request, Response } from 'express';
import { ItemsSchema } from '../schemas/items.schemas';
import {
  createItemsService,
  deleteItemsService,
  getAllItemsService,
  getItemsByIdService,
  updateItemsService,
} from '../services/items.service';
import { storageClient } from '../config/supabaseStorage';
import { getPath } from '../utils/getPath';

export const getAllItemsControllers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getAllItemsService();

    res.status(200).json({ message: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const getDataItemsByIdControllers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = await getItemsByIdService(Number(id));
    res.status(200).json({ message: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const createDataItemsControllers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).user;
    const body = req.body;
    const publicUrl = (req as any).publicUrl;

    const dataBody = { images: publicUrl, ...body };
    const validateBody = await ItemsSchema.validateAsync(dataBody);

    const data = await createItemsService(Number(id), validateBody);

    res.status(200).json({ message: 'Create Items success', data });
  } catch (error) {
    next(error);
  }
};

export const updateDataItemsControllers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    let imageUrl;

    const getItemById = await getItemsByIdService(Number(id));
    if (!getItemById) {
      res.status(404).json({ message: 'Items Not Found' });
      return;
    }

    const pathUrl = getPath(getItemById?.images!);

    if (req.file) {
      await storageClient.from('warket-items').remove([pathUrl]);
      imageUrl = (req as any).publicUrl;
    }

    const dataBody = { images: imageUrl, ...body };
    const validateBody = await ItemsSchema.validateAsync(dataBody);

    const data = await updateItemsService(Number(id), validateBody);

    res.status(200).json({ message: 'Update items success', data });
  } catch (error) {
    next(error);
  }
};

export const deleteDataItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const getItemsByid = await getItemsByIdService(Number(id));
    if (!getItemsByid) {
      res.status(404).json({ message: 'Items Not Found' });
      return;
    }
    const pathUrl = getPath(getItemsByid?.images!);
    await storageClient.from('warket-items').remove([pathUrl]);

    const data = await deleteItemsService(Number(id));
    res.status(200).json({ message: 'Delete Items success', data });
  } catch (error) {
    next(error);
  }
};
