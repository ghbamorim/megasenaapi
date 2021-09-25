import app from "../app";
import refreshResults from "../scr/midleware/refreshResults";
import { init } from "../scr/puppeteer";
import fs from "fs";
const request = require("supertest");

const testAllResults = (json: any) => {
  const date = new Date(json.date);
  expect(date).not.toBeNull;
  const last = json.results.slice(-1)[0];
  expect(last).not.toBeNull;
  expect(last.coluna_1).not.toBeNaN;
  expect(last.coluna_2).not.toBeNaN;
  expect(last.coluna_3).not.toBeNaN;
  expect(last.coluna_4).not.toBeNaN;
  expect(last.coluna_5).not.toBeNaN;
  expect(last.coluna_6).not.toBeNaN;
};

jest.setTimeout(40000);
test("should refresh json file", async () => {
  /*if (fs.existsSync("resultados.json")) {
    fs.unlinkSync("resultados.json");
  }
  await init();*/
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

test("result 123", async () => {
  const res = await request(app).get("/results/123");
  expect(res.body.coluna_1).toBe("013");
  expect(res.body.coluna_2).toBe("014");
  expect(res.body.coluna_3).toBe("016");
  expect(res.body.coluna_4).toBe("026");
  expect(res.body.coluna_5).toBe("032");
  expect(res.body.coluna_6).toBe("042");
});

test("last", async () => {
  const res = await request(app).get("/last");
  testAllResults(res.boty);
});
