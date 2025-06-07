import { prisma } from '../libs/prisma.libs';
import { UsersTypes, UsersUpdateTypes } from '../types/users.types';

export const getAllUsersServices = async () => {
  return await prisma.user.findMany();
};

export const getUsersByEmailServices = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email },
  });
};

export const getUsersByIdServices = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createUsersServices = async (data: UsersTypes) => {
  return await prisma.user.create({
    data,
  });
};

export const updateUsersServices = async (
  id: number,
  data: UsersUpdateTypes,
) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};
