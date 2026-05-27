import pino, { type Logger } from "pino";

const isDev = process.env.NODE_ENV !== "production";

const baseOptions: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL ?? (isDev ? "debug" : "info"),
  base: { app: "chatbot-btp" },
};

// pino-pretty is only loaded in dev (and only if installed).
function createLogger(): Logger {
  if (isDev) {
    try {
      return pino({
        ...baseOptions,
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss.l",
            ignore: "pid,hostname,app",
          },
        },
      });
    } catch {
      // fall through to default
    }
  }
  return pino(baseOptions);
}

export const logger = createLogger();

export function childLogger(bindings: Record<string, unknown>): Logger {
  return logger.child(bindings);
}
