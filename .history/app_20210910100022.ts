import Express from "express";
import { init } from "./scr/puppeteer";

const app = Express();

const PORT = process.env.PORT || 8001;

export class Results {
  date?: Date;
  results: any[] = [];
}

app.get("/allresults", async (req: any, res: any) => {
  try {
    res.status(200).json(await init());
  } catch (err) {
    res.status(500).json({ error: err });
  }

  res.send("sincronizando... isto pode levar alguns segundos");
});

app.get("/returnResults", async (req: any, res: any) => {
  try {
    const jsonContent = fs.readFile("resultados.json", "utf8");
    res.status(200).json(await init());
  } catch (err) {
    res.status(500).json({ error: err });
  }

  res.send("sincronizando... isto pode levar alguns segundos");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
