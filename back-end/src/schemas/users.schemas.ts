import joi from 'joi';

export const UsersSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string(),
  password: joi.string(),
});

export const AuthSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
