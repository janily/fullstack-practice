// ts 直接引入 js 包，无法读取类型
import fs from "fs";
import path from "path";
import superagent from "superagent";
import cheerio from "cheerio";

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
class Cral {
  private url = `http://www.svgtrick.com`;
  private filePath = path.resolve(__dirname, "../data/article.json");

  // private rawHtml = "";

  getJsonInfo(html: string) {
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
  async getRawHtml() {
    const result = await superagent.get(this.url);
    // this.rawHtml = result.text;
    return result.text;
  }

  generateJson(resultInfo: articleResult) {
    let fileContent: Content = {};
    if (fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }

    fileContent[resultInfo.time] = resultInfo.data;
    return fileContent;
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const resultInfo = this.getJsonInfo(html);
    const filetData = this.generateJson(resultInfo);
    this.writeFile(JSON.stringify(filetData));
  }
  constructor() {
    this.initSpiderProcess();
  }
}

const cral = new Cral();
