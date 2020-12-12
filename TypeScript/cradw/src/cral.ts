// ts 直接引入 js 包，无法读取类型
import path from "path";
import superagent from "superagent";
import SvgAnalyze from "./svg";
import fs from "fs";

export interface Analyze {
  analyze: (html: string, filePaht: string) => string;
}

class Cral {
  private filePath = path.resolve(__dirname, "../data/article.json");

  // private rawHtml = "";

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    // this.rawHtml = result.text;
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileData = this.SvgAnalyze.analyze(html, this.filePath);
    this.writeFile(fileData);
  }
  constructor(private url: string, private SvgAnalyze: Analyze) {
    this.initSpiderProcess();
  }
}

const url = `http://www.svgtrick.com`;

const analyze = SvgAnalyze.getInstance();
new Cral(url, analyze);
