// 모듈 로드
var bayes = require('bayes');
const { fetchSync } = require('cheerio-httpcli');
var Mecab = require('./mecab-mod.js');
var mecab = new Mecab();
var fs = require('fs');

// 샘플 텍스트
var file = 'temp_text.txt';
fs.readFile(file, function(err, data){
	if(err) throw err;
	console.log(data);
});

// 텍스트 분할방법을 설정 ---- (※1)
var classifier = bayes({
    tokenizer: function (text) { return mecab.parse(text); }
});

// 텍스트 학습  --- (※2)
classifier.learn(file, '긍정');

// 카테고리 판정 --- (※3)
categorize('추천');
categorize('좋은');
categorize('맛있');


// 카테고리 분류 결과를 출력 ---- (※4)
function categorize(text) {
  var r = classifier.categorize(text);
  console.log("카테고리=[" + r + "] - " + text);
}
