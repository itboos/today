const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');

// const getUrl = 'https://www.zhihu.com/question/29470294';
const getUrl = 'https://www.jianshu.com/';
const homeUrl = 'https://www.jianshu.com/';
var articlesArr = [];
/**
 *  是否可以这样，写一个图片地址的正则， 然后把整个网页匹配的图片地址打印出来， 然后去下载，保存到文件夹.
 */
superagent.get(getUrl, (err, res)=> {
  if (err) {
    throw Error(err);
    return;
  }
  // 等待code
  let $ = cheerio.load(res.text);
  let ul = $('#list-container .note-list').children();
  ul.each((index, $ele) => {
    // 这里$ele就是为Dom元素,需要包装成cheerio对象后，才能使用它的方法.
    articlesArr.push(
      parseArticle($($ele))
    );
  });

  
  // 写入数据到本地的json文件
  fs.writeFileSync(__dirname + '/data/aiticle_list.json', 
    JSON.stringify({
      status: 0,
      data: articlesArr,
    }), { encoding: 'utf8'}
  );



  // 定义我们想要的数据结构:
  var dataStruct = {
    title: '文章标题',
    author: '作者',
    avatar: '', // 头像
    time: '昨天',
    summery: '文章概览........', 

    seeCouts: 100,
    loves: 999,
    commits: 18,
    money: 2,
    href: '文章地址',
    commitHref: '评论地址',
    photo: '封面',

  };
});

/**
 * 根据某个cherrio 节点， query出我们想要的数据
 * @param {cherrio ele}  
 */
function parseArticle($ele) {
  // replace(/\n/g, '').replace(/\s/g, '') 目的是去掉换行和空格
  const article = {
    title:  $ele.find('.title').text().replace(/\n/g, '').replace(/\s/g, ''),
    author: $ele.find('.nickname').text().replace(/\n/g, '').replace(/\s/g, ''),
    home:  `${ homeUrl }${$ele.find('.avatar').attr('href')}`,
    avatar: `http://${$ele.find('.avatar > img').attr('src')}`, // 头像
    time: $ele.find('.info .time').attr('data-shared-at'),
    summery: $ele.find('.abstract').text().replace(/\n/g, '').replace(/\s/g, ''), 

    seeCouts: $ele.find('.meta a:first-child').text().replace(/\n/g, '').replace(/\s/g, ''),
    loves: $ele.find('.meta span').eq(0).text().replace(/\n/g, '').replace(/\s/g, ''),
    commits: $ele.find('.meta a').eq(1).text().replace(/\n/g, '').replace(/\s/g, ''),
    money: $ele.find('.meta span:last-child') && $ele.find('.meta span:last-child').text().replace(/\n/g, '').replace(/\s/g, '') || 0,
    aiticleHref: `${ homeUrl }${$ele.find('.meta a:first-child').attr('href')}`,
    commitHref: `${ homeUrl }${$ele.find('.meta a').eq(1).attr('href')}`,
    photo: `http:${$ele.find('.img-blur').attr('src')} || '' `,
  };
  return article;
}