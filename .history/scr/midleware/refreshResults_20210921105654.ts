import { Response, NextFunction } from "express";

const config = process.env;

const refreshResults = (req: any, res: Response, next: NextFunction) => {
  return next();
};

export default refreshResults;
