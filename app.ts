import cors from "cors";
import Express from "express";
import fs from "fs";
import Config from "./scr/config";
import refreshResults from "./scr/midleware/refreshResults";
import { init } from "./scr/puppeteer";
import { Results } from "./scr/models/result";

const app = Express();

app.use(cors());
app.use(Express.urlencoded());
app.use(Express.json());
app.use(refreshResults);

app.post("/refresh", async (req: any, res: any) => {
  try {
    init();
    res.status(200).send(Config.messages.sync);
  } catch (err) {
    const msg = (err as any).message;
    res.status(500).json({ error: msg });
  }
});

app.get("/allresults", async (req: any, res: any) => {
  try {
    const json = JSON.parse(fs.readFileSync("resultados.json", "utf8"));
    res.status(200).json(json);
  } catch (err) {
    const msg = (err as any).message;
    res.status(500).json({ error: msg });
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
    const msg = (err as any).message;
    res.status(500).json({ error: msg });
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
    const msg = (err as any).message;
    res.status(500).json({ error: msg });
  }
});

app.post("/stats", async (req: any, res: any) => {
  try {
    const userNumbers = req.body.results;
    const json: Results = JSON.parse(
      fs.readFileSync("resultados.json", "utf8")
    );

    const resultsToArray = (c: any) => {
      return [
        Number(c.coluna_1),
        Number(c.coluna_2),
        Number(c.coluna_3),
        Number(c.coluna_4),
        Number(c.coluna_5),
        Number(c.coluna_6),
      ];
    };

    const found = json.results.filter((value) => {
      const filteredInnerArray = resultsToArray(value).filter((i) =>
        userNumbers.includes(i)
      );
      return filteredInnerArray.length === userNumbers.length;
    });

    res.status(200).json(found);
  } catch (err) {
    const msg = (err as any).message;
    res.status(500).json({ error: msg });
  }
});

export default app;
