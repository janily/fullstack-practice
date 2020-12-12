import cheerio from "cheerio";
import fs from "fs";
import { Analyze } from "./cral";

interface Articles {
  title: string;
  view: number;
}

interface articleResult {
  time: number;
  data: Articles[];
}

interface Content {
  [propName: number]: Articles[];
}

export default class SvgAnalyze implements Analyze {
  private static instance: SvgAnalyze;

  static getInstance() {
    if (!SvgAnalyze.instance) {
      SvgAnalyze.instance = new SvgAnalyze();
    }

    return SvgAnalyze.instance;
  }
  private getJsonInfo(html: string) {
    const $ = cheerio.load(html);

    const articleItems = $(".trick-card");

    const articleInfos: Articles[] = [];

    articleItems.map((index, element) => {
      const title = $(element)
        .find(".trick-card-title")
        .text()
        .replace(/(^\s*)|(\s*$)/g, "");
      const view = parseInt(
        $(element).find(".trick-card-stat-block").eq(0).text()
      );
      // console.log(view);

      articleInfos.push({
        title,
        view,
      });
    });

    // console.log(articleItems.length);

    return {
      time: new Date().getTime(),
      data: articleInfos,
    };

    // console.log(result);
  }

  private generateJson(resultInfo: articleResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    fileContent[resultInfo.time] = resultInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const resultInfo = this.getJsonInfo(html);
    const filetData = this.generateJson(resultInfo, filePath);
    return JSON.stringify(filetData);
  }

  private constructor() {}
}
