var request = require('request');

var options = {
	headers : {
		"X-Naver-Client-Id" : "tY2ofr7ug5SOeHvGdBoZ",
		"X-Naver-Client-Secret" : "u8DRvoycv4"
	},
	method : 'get',
	encoding: "utf-8",
	url : 'https://openapi.naver.com/v1/search/local.xml',
	qs : {
	  query : "냉정맛집",
	  display : 10,
	  start : 1,
	  sort : "random"
	}
}


request(options, function(err, res, title) {
	console.log(title);
});
