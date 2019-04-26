/* https://www.kancloud.cn/kancloud/promises-book/44249 Promise 小书- promise 按顺序执行 */
function getURL(URL) {
  return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', URL, true);
      req.onload = function () {
          if (req.status === 200) {
              resolve(req.responseText);
          } else {
              reject(new Error(req.statusText));
          }
      };
      req.onerror = function () {
          reject(new Error(req.statusText));
      };
      req.send();
  });
}
const getUrl1 = '/wxAct/getActivityInfo?activityNo=test0422&key=e6975067'
const getUrl2 = '/wxAct/applyTicketByActNo?activityNo=test0422&key=e6975067&phonenumber=13168024501'
var request = {
      comment: function getComment() {
          return getURL(getUrl1).then(JSON.parse);
      },
      people: function getPeople(fisrtGetData) {
          console.log('fisrtGetData:', JSON.stringify(fisrtGetData))
          return getURL(getUrl2).then(JSON.parse);
      }
  };
function main() {
  function recordValue(results, value) {
      results.push(value);
      return results; // return 的目的是下一个then 处理函数能拿到这个结果
  }
  // [] 用来保存初始化的值 函数柯里化 提供了第一个参数，results, bind 的特性, results 相当于闭包，这个值一直保留了下来.
  var pushValue = recordValue.bind(null, []);
  return request.comment().then(pushValue).then(request.people).then(pushValue);
}

// 运行示例
main().then(function (value) {
  console.log(value);
}).catch(function(error){
  console.error(error);
});

// 测试：
// var n = 0;
// function recordValue(results, value) {
//   results.push(value);
//   console.log('n', n, JSON.stringify(results))
//   return results; // return 的目的是下一个then 处理函数能拿到这个结果
// }

// // [] 用来保存初始化的值 函数柯里化 提供了第一个参数，results, bind 的特性, results 相当于闭包，这个值一直保留了下来.
// var pushValue = recordValue.bind(null, []);
// var res1 = pushValue(1);
// pushValue(3)
// pushValue(4)
// pushValue(5)
// var res2 = pushValue(6)
// console.log('res2', res2)