import { NextFunction, Request, Response } from 'express';

export const getAllItemsControllers = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = (req as any).user;
  const body = req.body;

  res.status(200).json({ data: id });
};
