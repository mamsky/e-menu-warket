import joi from 'joi';

export const ItemsSchema = joi.object({
  name: joi.string(),
  image: joi.string(),
  category: joi.string().valid('FOOD', 'DRINK', 'SNACK'),
  price: joi.number(),
});
