import { NextFunction, Request, Response } from 'express';
import {
  createItemsService,
  deleteItemsService,
  getAllItemsService,
  getItemsByIdService,
  updateItemsService,
} from '../services/items.service';
import { ItemsSchema } from '../schemas/items.schemas';

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

    const validateBody = await ItemsSchema.validateAsync(body);

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
    const validateBody = await ItemsSchema.validateAsync(body);

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

    const data = await deleteItemsService(Number(id));
    res.status(200).json({ message: 'Delete Items success', data });
  } catch (error) {
    next(error);
  }
};
