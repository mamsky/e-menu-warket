import { NextFunction, Request, Response } from 'express';
import { ItemsSchema } from '../schemas/items.schemas';

export const getAllItemsControllers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = (req as any).user;
  const body = req.body;

  const validateBody = await ItemsSchema.validateAsync(body);

  res.status(200).json({ data: id });
};
