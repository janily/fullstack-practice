// ts 直接引入 js 包，无法读取类型
import superagent from "superagent";

class Cral {
  private url = `http://www.svgtrick.com`;

  private rawHtml = "";
  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.rawHtml = result.text;
    console.log(result.text);
  }
  constructor() {
    this.getRawHtml();
  }
}

const cral = new Cral();
