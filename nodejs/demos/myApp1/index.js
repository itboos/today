const fs = require('fs');
const path = require('path');
const paths = '/Users/xueqi/Desktop/git/today/nodejs/demos/myApp1/text1.txt';

const fn = require('../myApp2/');
const json = require('./package.json');
console.log('package.json:', json);
console.log('package.json:', json.version);