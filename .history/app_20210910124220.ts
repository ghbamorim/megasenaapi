import Express from "express";
import schedule from "node-schedule";
import { init } from "./scr/puppeteer";

const app = Express();

const PORT = process.env.PORT || 8000;

export class Results {
  date?: Date;
  results: any[] = [];
}

app.post("/refresh", async (req: any, res: any) => {
  try {
    init();
  } catch (err) {
    console.log(err);
  }

  res.send("sincronizando... isto pode levar alguns segundos");
});

app.get("/allresults", async (req: any, res: any) => {
  try {
    const json = require("file.json");
    res.status(200).json(json);
  } catch (err) {
    console.log(err);
  }
});

app.get("/results/:idconcurso", async (req: any, res: any) => {
  try {
    const json: Results = require("file.json");
    const found = json.results.find(
      (element) => element.concurso === req.params.idconcurso
    );
    if (found) {
      res.status(200).json(found);
    } else {
      res
        .status(404)
        .json({ status: 404, mensagem: "concurso não encontrado" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/last", async (req: any, res: any) => {
  try {
    const json: Results = require("./file.json");
    const found = json.results.slice(-1)[0];
    res.status(200).json(found);
  } catch (err) {
    console.log(err);
  }
});

schedule.scheduleJob("00 20 * * *", () => {
  try {
    init();
  } catch (error) {
    console.log(error);
  }
});

schedule.scheduleJob("00 22 * * *", () => {
  try {
    init();
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
