var client = require('cheerio-httpcli');

var url = "https://search.naver.com/search.naver?where=nexearch&sm=top_sug.pre&fbm=1&acr=1&acq=%EB%83%89%EC%A0%95+%EB%A7%9B&qdt=0&ie=utf8&query=%EB%83%89%EC%A0%95+%EB%A7%9B%EC%A7%91"
var param = {};
 
client.fetch(url, param, function(err, $, res){
  if (err) {
    console.log("Error:", err);
    return;
  }
  $("span.rating").each(function(idx){
    var text = $(this).text();
    console.log(text);
  });
  
});
