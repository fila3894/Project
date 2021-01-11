var https = require('https');
var parseString = require('xml2js').parseString;
var fs = require('fs');

var keyword = '냉정대물개';
// 1안 냉정 맛집 --> 해당 가게 포스팅 개수 --> 도표
// 2안 가게 이름 --> 키워드 개수 --> 학습 --> 도표
// 3안 둘 다 

var client_id = 'tY2ofr7ug5SOeHvGdBoZ';
var client_secret  = 'u8DRvoycv4';
var host = 'openapi.naver.com';
var port = 443;
var uri = '/v1/search/blog.xml?query=' + encodeURIComponent(keyword);
var file = 'temp_text.txt';
fs.open(file, 'w', function(err, fd){
	if(err) throw err;
	console.log('file open complete');
});

var options = {
    host: host,
    port: port,
    path: uri,
    method: 'GET',
    headers: {"X-Naver-Client-Id" : client_id, "X-Naver-Client-Secret" : client_secret}
};

var result = "";

var req = https.request(options, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function(chunk){
        result = result + chunk;
    });
    res.on('end', function(){
        parseString(result, function(err, pStr){
            var items = pStr.rss.channel[0].item;
            for (var i in items) {
                console.log("TITLE: " + items[i].title[0]);
                console.log("DESC: " + items[i].description[0]);

                num1 = items[i].title[0].match(/대물개/g).length;
                num2 = items[i].description[0].match(/대물개/g).length;
                console.log(num1);
                console.log(num2);
                console.log("---------------------------------------------------------------");
            }
            for(var k = 0; k < 10; k++){
                var vvalue = items[k].title[0] + " : " + items[k].description[0];
                fs.appendFileSync('temp_text.txt', vvalue + '\n', 'utf-8', function(error){
                    console.log(k + 'error');
                });
            }
        });
    });
});
req.end();
