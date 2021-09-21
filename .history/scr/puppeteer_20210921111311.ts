const puppeteer = require("puppeteer");
import fs from "fs";

const storeData = (data: any, path: string) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

export const init = async (callBack: Function) => {
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
          return link;
        }
      }
      return null;
    }

    const getResults = async (page: any) => {
      const arr = await page.evaluate(() =>
        Array.from(document.querySelectorAll("table > tbody > tr"), (row) =>
          Array.from(row.querySelectorAll("td"), (cell: any) => cell.innerText)
        )
      );

      const result = [];

      for (const item of arr) {
        if (item.length > 1) {
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
            canhadores_Faixa_1: item[9],
            canhadores_Faixa_2: item[10],
            canhadores_Faixa_3: item[11],
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
    console.log("1");
    const page = await browser.newPage();
    console.log("2");
    await page.setDefaultNavigationTimeout(180000);
    await page.goto(
      "http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena/"
    );
    console.log("3");

    const link = await findByLink(
      page,
      "Resultado da Mega Sena por ordem de sorteio"
    );
    if (link) {
      console.log("4");
      await link.click();
      console.log("5");
      await page.waitForTimeout(10000);
      console.log("6");
      const pages = await browser.pages();
      console.log("7");
      const resultPage = pages[2];
      console.log("8");
      let result = await getResults(resultPage);
      console.log("9");
      const jsonResult = {
        date: new Date(),
        results: result,
      };
      console.log("10");
      storeData(jsonResult, "resultados.json");
      console.log("11");
    }

    await browser.close();
  } catch (error) {
    console.log(error);
    if ((error as any).message) {
      console.log((error as any).message);
    }
  }
};
