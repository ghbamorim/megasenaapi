import { Response, NextFunction } from "express";
import { init } from "../puppeteer";
import fs from "fs";

export class RefreshControl {
  static instance: RefreshControl | undefined;
  updating?: boolean;
  static getInstance = () => {
    if (!RefreshControl.instance) {
      RefreshControl.instance = new RefreshControl();
    }
    return RefreshControl.instance;
  };
}

const refreshResults = (req: any, res: Response, next: NextFunction) => {
  const fileExis;
  if (!fs.existsSync("resultados.json")) {
    res.status(102).send("sincronizando... isto pode levar alguns segundos");
  }
  let results = undefined;
  let date = undefined;
  if (fs.existsSync("resultados.json")) {
    results = JSON.parse(fs.readFileSync("resultados.json", "utf8"));
    date = new Date(results.date);
  }

  const now = new Date();
  if (
    !results ||
    !date ||
    (now.getDate() - date.getDate() >= 1 / 12 &&
      !RefreshControl.getInstance().updating)
  ) {
    RefreshControl.getInstance().updating = true;
    init(() => {
      RefreshControl.getInstance().updating = false;
    });
  }
  if (fs.existsSync("resultados.json")) {
    return next();
  }
};

export default refreshResults;
