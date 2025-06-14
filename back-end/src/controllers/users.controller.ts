import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthSchema, UsersSchema } from '../schemas/users.schemas';
import {
  createUsersServices,
  getAllUsersServices,
  getUsersByEmailServices,
  getUsersByIdServices,
} from '../services/users.service';
import { UsersTypes } from '../types/users.types';

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

export const createUsersControllers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const { email, password, name } = await UsersSchema.validateAsync(body);

    const usersEmail = await getUsersByEmailServices(email);
    if (usersEmail) {
      res.status(400).json({ message: 'Username already in use ' });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const bodyData: UsersTypes = {
      email,
      name,
      password: hashPassword,
    };

    const data = await createUsersServices(bodyData);

    res.status(200).json({ message: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const loginUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const jwt_key = process.env.JWT_SECRET_KEY || '';

    const { email, password } = await AuthSchema.validateAsync(body);

    const usersEmail = await getUsersByEmailServices(email);
    if (!usersEmail) {
      res.status(404).json({ message: 'email or password not match' });
      return;
    }

    const usersPassword = await bcrypt.compare(password, usersEmail.password);
    if (!usersPassword) {
      res.status(404).json({ message: 'email or password not match' });
      return;
    }

    const token = jwt.sign(
      {
        id: usersEmail.id,
      },
      jwt_key,
      { expiresIn: '1d' },
    );
    res.status(200).json({ message: 'success', token });
  } catch (error) {
    next(error);
  }
};

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = (req as any).user;
    if (!payload.id) {
      res.status(401).json({ message: 'Unauthorize' });
      return;
    }
    const users = await getUsersByIdServices(Number(payload.id));

    res.status(201).json({ message: 'success', data: users });
  } catch (error) {
    next(error);
  }
};
