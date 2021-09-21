import { Response, NextFunction } from "express";

const refreshResults = (req: any, res: Response, next: NextFunction) => {
  return next();
};

export default refreshResults;
