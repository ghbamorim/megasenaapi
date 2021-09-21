import { Response, NextFunction } from "express";
import { init } from "../puppeteer";

const refreshResults = (req: any, res: Response, next: NextFunction) => {
  return next();
};

export default refreshResults;
