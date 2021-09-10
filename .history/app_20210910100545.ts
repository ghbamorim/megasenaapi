import Express from "express";
import { init } from "./scr/puppeteer";
const fs = require("fs");

const app = Express();

const PORT = process.env.PORT || 8001;

export class Results {
  date?: Date;
  results: any[] = [];
}

app.get("/allresults", async (req: any, res: any) => {
  try {
    init();
    res.status(200).json({ message: "aguarde" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/returnResults", async (req: any, res: any) => {
  try {
    const obj = JSON.parse(fs.readFileSync("resultados.json", "utf8"));
    res.status(200).json(obj);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
