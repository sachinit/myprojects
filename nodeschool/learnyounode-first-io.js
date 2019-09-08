let fs = require('fs');

let fullFilePath = process.argv[2];

let buff = fs.readFileSync(fullFilePath);

let fullText = buff.toString();
console.log(fullText.split('\n').length-1);
