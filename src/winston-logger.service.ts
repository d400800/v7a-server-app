import * as winston from 'winston';

const { colorize, combine, timestamp, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp, context }) => {
  return `${timestamp} [${level}] [${context.constructor.name}]: ${message}`;
});

export const winstonLogger = winston.createLogger({
  //format: combine(timestamp(), customFormat),
  format: combine(
    colorize({
      all: true,
    }),
    timestamp(),
    customFormat,
  ),
  transports: [
    new winston.transports.Console(),
    // You can add more transports if needed (e.g., file transport)
  ],
});
