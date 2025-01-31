import winston from 'winston';
import DailyRotateFile from "winston-daily-rotate-file";
import expressWinston from "express-winston";



export const logger = winston.createLogger({
    level: "debug",
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({ filename: "server.log", datePattern: 'YYYY-MM-DD-HH', maxSize: '20m', maxFiles: '14d' }),
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  });

export const requestLogger = expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'server.log' }) // Log requests separately
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    meta: true, // Log request metadata
    expressFormat: true, // Shortened, human-readable logs
    colorize: false, // Disable colors in log files
  });

// export default {logger, requestLogger};