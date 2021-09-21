import { Response, NextFunction } from "express";
import { init } from "../puppeteer";
import fs from "fs";

class RefreshControl {
  static instance: RefreshControl | undefined;
  updating?: boolean;
  getInstance = () => {
    if (!RefreshControl.instance) {
      RefreshControl.instance = new RefreshControl();
    }
    return RefreshControl.instance;
  };
}

const refreshResults = (req: any, res: Response, next: NextFunction) => {
  const results = JSON.parse(fs.readFileSync("resultados.json", "utf8"));
  const date = new Date(results.date);
  const now = new Date();
  if (now.getDate() - date.getDate() >= 1) {
    RefreshControl.getInstance().updating = true;
    init();
  }

  return next();
};

export default refreshResults;
