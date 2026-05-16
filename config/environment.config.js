import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.CI) {
  const { error } = dotenv.config({ path: path.resolve(__dirname, '../.env') });
  if (error) {
    console.error('.env file not found or could not be loaded:', error.message);
    process.exit(1);
  }
}

// Safety check — if any required variable is missing, stop immediately
const required = ['SUITE_USERNAME', 'SUITE_PASSWORD', 'SUITE_URL'];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required env variable: ${key}`);
    process.exit(1);
  }
}

// Export all variables in one place — no more process.env scattered everywhere
export const appConfig = {
  username: process.env.SUITE_USERNAME,
  password: process.env.SUITE_PASSWORD,
  baseURL:  process.env.SUITE_URL,
};
