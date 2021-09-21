import { Response, NextFunction } from "express";
import { init } from "../puppeteer";
import fs from "fs";

const refreshResults = (req: any, res: Response, next: NextFunction) => {
  const json = JSON.parse(fs.readFileSync("resultados.json", "utf8"));

  return next();
};

export default refreshResults;
