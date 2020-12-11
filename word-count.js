var fs = require('fs');
var file = 'temp_text.txt';

n = file.match(/대물개/g).length;
console.log(n);

