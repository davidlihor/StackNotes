import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { promises as fsPromises } from 'fs';
import path from "path";
import { NextFunction, Request, Response } from "express";

const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), "dd.MM.yyyy\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
