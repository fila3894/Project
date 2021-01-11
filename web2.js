const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("https://map.naver.com/v5/search/%EB%8F%99%EC%84%9C%EB%8C%80%20%EB%A7%9B%EC%A7%91/place/1999261892?c=14359343.0894536,4183977.8074027,15,0,0,0,dh&placePath=%3Fentry%253Dpll%2526");
  } catch (error) {
    console.error(error);
  }h
};


getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul._1QS0G li").children("div._1Z_GL");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('div.PVBo8 span').text(),
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
