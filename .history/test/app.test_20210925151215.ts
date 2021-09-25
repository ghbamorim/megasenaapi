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
  testAllResults(res);
});
/*
const validateQuote = (quote: any) => {
  expect(quote).toHaveProperty("name");
  expect(quote).toHaveProperty("symbol");
  expect(quote).toHaveProperty("open");
  expect(quote).toHaveProperty("high");
  expect(quote).toHaveProperty("low");
  expect(quote).toHaveProperty("close");
};

const quotes = [
  "AAIC.US",
  "ABB.US",
  "ABVC.US",
  "ACAH.US",
  "ACAHW.US",
  "ACGLP.US",
  "ACIC-U.US",
  "AAIC.US",
  "ABB.US",
  "ABVC.US",
  "ACAH.US",
  "ACAHW.US",
  "ACGLP.US",
  "AAIC.US",
  "ABB.US",
  "ABVC.US",
  "ACAH.US",
  "ACAHW.US",
  "AAIC.US",
  "ABB.US",
  "ABVC.US",
  "ACAH.US",
];

for (const quote of quotes) {
  test(`query stock ${quote}`, async () => {
    const res = await request(app)
      .get(`/stock?q=${quote}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    validateQuote(res.body);
  });
}

test("user query history", async () => {
  const res = await request(app)
    .get("/history")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  const history = res.body;
  for (const entry of history) {
    expect(entry).toHaveProperty("date");
    validateQuote(entry);
  }
});

test("most frequent quotes", async () => {
  const res = await request(app)
    .get("/stats")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  const history = res.body;
  expect(history.length).toEqual(5);
  for (const entry of history) {
    expect(entry).toHaveProperty("stock");
    expect(entry).toHaveProperty("times_requested");
  }
});

test("/stock should not pass without authentication token", async () => {
  const res = await request(app).get(`/stock?q=AAIC.US`);
  expect(res.statusCode).toEqual(401);
});

test("/history should not pass without authentication token", async () => {
  const res = await request(app).get("/history");
  expect(res.statusCode).toEqual(401);
});

test("/stats should not pass without authentication token", async () => {
  const res = await request(app).get("/stats");
  expect(res.statusCode).toEqual(401);
});

test("only super user can access /stats", async () => {
  const res = await request(app).post("/register?e=ghbamorim@yahoo.com");
  const token = res.body.password;
  const statsRes = await request(app)
    .get("/stats")
    .set("Authorization", `Bearer ${token}`);
  expect(statsRes.statusCode).toEqual(403);
});
*/
