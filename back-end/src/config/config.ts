import dotenv from 'dotenv';
import { Config } from '../types/config.types';

dotenv.config();

export const config: Config = {
  port: Number(process.env.PORT) || 6969,
  nodeEnv: process.env.NODE_ENV || 'development',
};
