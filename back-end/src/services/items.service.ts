import { prisma } from '../libs/prisma.libs';
import { ItemsTypes } from '../types/items.types';

export const getAllItemsService = async () => {
  return await prisma.item.findMany({
    orderBy: {
      category: 'asc',
    },
  });
};

export const getItemsByIdService = async (id: number) => {
  return await prisma.item.findUnique({
    where: { id },
  });
};

export const createItemsService = async (userId: number, data: ItemsTypes) => {
  return await prisma.item.create({
    data: {
      userId,
      ...data,
    },
  });
};

export const updateItemsService = async (id: number, data: ItemsTypes) => {
  return await prisma.item.update({
    where: { id },
    data,
  });
};

export const deleteItemsService = async (id: number) => {
  return await prisma.item.delete({
    where: { id },
  });
};
