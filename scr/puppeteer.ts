const puppeteer = require("puppeteer");
import fs from "fs";
import Config from "./config";

const storeData = (data: any, path: string) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

export const init = async (callBack?: Function) => {
  let debugStep = 0;
  try {
    function getText(linkText: any) {
      linkText = linkText.replace(/\r\n|\r/g, "\n");
      linkText = linkText.replace(/\ +/g, " ");
      var nbspPattern = new RegExp(String.fromCharCode(160), "g");
      return linkText.replace(nbspPattern, " ");
    }

    async function findByLink(page: any, linkString: any) {
      const links = await page.$$("a");
      for (const link of links) {
        let valueHandle = await link.getProperty("innerText");
        let linkText = await valueHandle.jsonValue();
        const text = getText(linkText);
        if (linkString == text) {
          const hrefHandle = await link.getProperty("href");
          const href = await hrefHandle.jsonValue();
          return [link, href];
        }
      }
      return [null, null];
    }

    const getResults = async (page: any) => {
      const arr = await page.evaluate(() =>
        Array.from(document.querySelectorAll("table > tbody > tr"), (row) =>
          Array.from(row.querySelectorAll("td"), (cell: any) => cell.innerText)
        )
      );

      const result = [];

      for (const item of arr) {
        if (
          item.length > 9 &&
          item[3] &&
          item[4] &&
          item[5] &&
          item[6] &&
          item[7] &&
          item[8]
        ) {
          result.push({
            concurso: item[0],
            local: item[1],
            data_do_sorteio: item[2],
            coluna_1: item[3],
            coluna_2: item[4],
            coluna_3: item[5],
            coluna_4: item[6],
            coluna_5: item[7],
            coluna_6: item[8],
            ganhadores_Faixa_1: item[9],
            ganhadores_Faixa_2: item[10],
            ganhadores_Faixa_3: item[11],
            rateio_faixa_1: item[12],
            rateio_faixa_2: item[13],
            rateio_faixa_3: item[14],
            valor_arrecadado: item[16],
            estimativa_para_o_proximo_concurso: item[17],
            valor_acumulado_proximo_concurso: item[18],
            acumulado: item[19],
            sorteio_especial: item[20],
            observacao: item[21],
          });
        }
      }
      return result;
    };

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    });
    debugStep = 1;
    const page = await browser.newPage();
    debugStep = 2;
    await page.setDefaultNavigationTimeout(180000);
    await page.goto(Config.urls.caixa);
    debugStep = 3;

    const [link, url] = await findByLink(
      page,
      Config.messages.resultOrdemSorteio
    );
    if (link && url) {
      debugStep = 4;
      await page.goto(url);
      debugStep = 5;
      let result = await getResults(page);
      debugStep = 6;
      const jsonResult = {
        date: new Date(),
        results: result,
      };
      debugStep = 7;
      storeData(jsonResult, "resultados.json");
      debugStep = 8;
    }

    await browser.close();
    if (callBack) {
      callBack();
    }
  } catch (error) {
    console.log(`Error at step ${debugStep}`);
    console.log(error);
    if ((error as any).message) {
      console.log((error as any).message);
    }
  }
};
