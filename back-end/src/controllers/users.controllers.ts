import { NextFunction, Request, Response } from 'express';
import { getAllUsersServices } from '../services/users.service';

export const getAllUsersControllers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getAllUsersServices();
    res.status(200).json({ message: 'success', data });
  } catch (error) {
    next(error);
  }
};
