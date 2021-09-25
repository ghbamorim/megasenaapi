import Express from "express";
import { init } from "./scr/puppeteer";
import fs from "fs";
import cors from "cors";
import refreshResults from "./scr/midleware/refreshResults";
import Config from "./scr/config";
import { config } from "process";

const app = Express();

export class Results {
  date?: Date;
  results: any[] = [];
}

app.use(cors());
app.use(refreshResults);

app.post("/refresh", async (req: any, res: any) => {
  try {
    init();
    res.status(200).send(Config.messages.sync);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/allresults", async (req: any, res: any) => {
  try {
    const json = JSON.parse(fs.readFileSync("resultados.json", "utf8"));
    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/results/:idconcurso", async (req: any, res: any) => {
  try {
    const json: Results = JSON.parse(
      fs.readFileSync("resultados.json", "utf8")
    );
    const found = json.results.find(
      (element) => element.concurso === req.params.idconcurso
    );
    if (found) {
      res.status(200).json(found);
    } else {
      res.status(404).json({ mensagem: Config.messages.notFound });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/last", async (req: any, res: any) => {
  try {
    const json: Results = JSON.parse(
      fs.readFileSync("resultados.json", "utf8")
    );
    const found = json.results.slice(-1)[0];
    res.status(200).json(found);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default app;
