"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const puppeteer = require("puppeteer");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    function getText(linkText) {
        linkText = linkText.replace(/\r\n|\r/g, "\n");
        linkText = linkText.replace(/\ +/g, " ");
        var nbspPattern = new RegExp(String.fromCharCode(160), "g");
        return linkText.replace(nbspPattern, " ");
    }
    function findByLink(page, linkString) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield page.$$("a");
            for (const link of links) {
                let valueHandle = yield link.getProperty("innerText");
                let linkText = yield valueHandle.jsonValue();
                const text = getText(linkText);
                if (linkString == text) {
                    return link;
                }
            }
            return null;
        });
    }
    const getResults = (page) => __awaiter(void 0, void 0, void 0, function* () {
        const arr = yield page.evaluate(() => Array.from(document.querySelectorAll("table > tbody > tr"), (row) => Array.from(row.querySelectorAll("td"), (cell) => cell.innerText)));
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
    });
    const browser = yield puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    });
    const page = yield browser.newPage();
    yield page.goto("http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena/");
    const link = yield findByLink(page, "Resultado da Mega Sena por ordem de sorteio");
    if (link) {
        yield link.click();
        yield page.waitForTimeout(10000);
        const pages = yield browser.pages();
        const resultPage = pages[2];
        let result = yield getResults(resultPage);
        const jsonResult = {
            date: new Date(),
            results: result,
        };
        return jsonResult;
    }
    yield browser.close();
});
exports.init = init;
//# sourceMappingURL=puppeteer.js.map