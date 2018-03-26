const isSushu = require('../index');
const data = require('./testdata');
const tape = require('tape');

data.forEach(ele => {
  let isSu = ele.expected ? '是': '不是';
  let actual = '';
  console.log(isSushu(parseInt(ele, 10)));

  tape(`${ele.num}- ${isSu}- 素数`, function(t) {
    t.plan(1);
    actual = isSushu(parseInt(ele.num, 10));
    t.equal(actual, ele.expected);
  });

});