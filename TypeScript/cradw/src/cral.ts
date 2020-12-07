// ts 直接引入 js 包，无法读取类型
import superagent from "superagent";
import cheerio from "cheerio"

interface Articles {
  title: string;
  view: number;
}

class Cral {
  private url = `http://www.svgtrick.com`;

  // private rawHtml = "";
  
  getJsonInfo(html: string) {
    const $ = cheerio.load(html);

    const articleItems = $('.trick-card');

    const articleInfos: Articles[] = [];

    articleItems.map((index, element) => {
      const title = $(element).find('.trick-card-title').text().replace(/(^\s*)|(\s*$)/g, "");
      const view = parseInt($(element).find('.trick-card-stat-block').eq(0).text())
      // console.log(view);

      articleInfos.push({
        title,view
      })
    })

    // console.log(articleItems.length);

    const result = {
      time: (new Date().getTime()),
      data: articleInfos
    }

    console.log(result);

  }
  async getRawHtml() {
    const result = await superagent.get(this.url);
    // this.rawHtml = result.text;
    this.getJsonInfo(result.text);
  }
  constructor() {
    this.getRawHtml();
  }
}

const cral = new Cral();
