// 此我们再来编写一个名为 sequenceTasks 的函数，它接收一个数组作为参数，数组里面存放的是要进行的处理Task。
// 从下面的调用代码中我们可以非常容易的从其函数名想到，该函数的功能是对 tasks 中的处理进行顺序执行了。
function sequenceTasks(tasks) {
  function recordValue(results, value) {
      results.push(value);
      return results;
  }
  var pushValue = recordValue.bind(null, []);
  return tasks.reduce(function (promise, task) {
      return promise.then(task).then(pushValue);
  }, Promise.resolve());
}
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
var request = {
      comment: function getComment() {
          return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
      },
      people: function getPeople() {
          return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
      }
  };
function main() {
  return sequenceTasks([request.comment, request.people]);
}
// 运行示例
main().then(function (value) {
  console.log(value);
}).catch(function(error){
  console.error(error);
});