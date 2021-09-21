import { Response, NextFunction } from "express";
import { init } from "../puppeteer";
import fs from "fs";

const refreshResults = (req: any, res: Response, next: NextFunction) => {
  const results = JSON.parse(fs.readFileSync("resultados.json", "utf8"));
  const date = results.date;
  const now = new Date();

  return next();
};

export default refreshResults;
