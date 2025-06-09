import { StorageClient } from '@supabase/storage-js';

const STORAGE_URL = process.env.SUPABASE_STORAGE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_STORAGE_KEY || '';

export const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});
