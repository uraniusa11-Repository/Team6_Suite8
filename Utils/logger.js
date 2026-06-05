import winston from 'winston';
import path from 'path';
import fs from 'fs'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
//const logToConsole = process.env.LOG_CONSOLE === 'true' ? true : false;
//const logLevel     = process.env.LOG_LEVEL === 'production' ? 'error' : 'debug';
const { combine, timestamp, printf, colorize } = winston.format;

const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const customFormat = printf(({ level, message, timestamp, featureName, scenarioTitle }) => {
  return `[${timestamp}] [${level.toUpperCase()}] [${featureName}] [${scenarioTitle}] ${message}`;
});

const transports = [
    new winston.transports.File({
      filename: path.join(logDir, 'all.log'),
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'errors.log'),
      level: 'error',
    }),
  ];

export const createLogger = (testInfo) => {
  const featureName   = testInfo.titlePath[1];
  const scenarioTitle = testInfo.title;
  const logToConsole  = process.env.LOG_CONSOLE === 'true';
  const logLevel      = process.env.LOG_LEVEL ?? 'debug';
    const transports = [
    new winston.transports.File({
      filename: path.join(logDir, 'all.log'),
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'errors.log'),
      level: 'error',
    }),
  ];

    if (logToConsole) {
    transports.push(
      new winston.transports.Console({
        format: combine(colorize(), timestamp(), customFormat)
      })
    );
  }

   return winston.createLogger({
    level: logLevel,
    format: combine(timestamp(), customFormat),
    transports,
    defaultMeta: { featureName, scenarioTitle }
  });
};