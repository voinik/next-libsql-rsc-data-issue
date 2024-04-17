import { createClient } from '@libsql/client/web';

if (!process.env.DB_URL || !process.env.DB_TOKEN) {
    throw new Error('Set DB_URL and DB_TOKEN in process.env');
}

export const dbClient = createClient({
  url: process.env.DB_URL!,
  authToken: process.env.DB_TOKEN!,
});

