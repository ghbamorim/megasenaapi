import app from "../app";
import { init } from "../scr/puppeteer";
import fs from "fs";
const request = require("supertest");

const testAllCols = (obj: any) => {
  expect(obj.coluna_1).not.toBeNaN;
  expect(obj.coluna_2).not.toBeNaN;
  expect(obj.coluna_3).not.toBeNaN;
  expect(obj.coluna_4).not.toBeNaN;
  expect(obj.coluna_5).not.toBeNaN;
  expect(obj.coluna_6).not.toBeNaN;
};

const testAllResults = (json: any) => {
  const date = new Date(json.date);
  expect(date).not.toBeNull;
  const last = json.results.slice(-1)[0];
  expect(last).not.toBeNull;
  testAllCols(last);
};

jest.setTimeout(100000);
test("should refresh json file", async () => {
  if (fs.existsSync("resultados.json")) {
    fs.unlinkSync("resultados.json");
  }
  await init();
  const fileExists = fs.existsSync("resultados.json");
  expect(fileExists).toEqual(true);
  if (fileExists) {
    const json = JSON.parse(fs.readFileSync("resultados.json", "utf8"));
    testAllResults(json);
  }
});

test("all results", async () => {
  const res = await request(app).get("/allresults");
  testAllResults(res.body);
});

test("result 2412", async () => {
  const res = await request(app).get("/results/2412");
  expect(res.body.coluna_1).toBe("009");
  expect(res.body.coluna_2).toBe("016");
  expect(res.body.coluna_3).toBe("034");
  expect(res.body.coluna_4).toBe("036");
  expect(res.body.coluna_5).toBe("049");
  expect(res.body.coluna_6).toBe("060");
});

test("last", async () => {
  const res = await request(app).get("/last");
  testAllCols(res.body);
});
