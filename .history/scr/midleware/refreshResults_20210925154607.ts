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
  const fileAlreadyExists = fs.existsSync("resultados.json");
  let results = undefined;
  let date = undefined;
  if (fileAlreadyExists) {
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
  if (fileAlreadyExists) {
    return next();
  } else {
    return res
      .status(200)
      .send("sincronizando... isto pode levar alguns segundos");
  }
};

export default refreshResults;
