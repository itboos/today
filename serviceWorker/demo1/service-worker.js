var VERSION = 'cache-v5';
// 添加缓存
self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open(VERSION).then(function(cache) {
     // 添加要缓存的文件列表
    return cache.addAll([
      './index.html',
      './about.js',
      './blog.js',
      './static/1.jpg',
    ]);
   })
 );
});

//更新缓存
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
            console.log('更新缓存.....');
          }
        })
      )
    })
  );
});


// 拦截请求，并且返回缓存数据

// self.addEventListener('fetch', function(event) {
//   event.respondWith(caches.match(event.request).catch(function() {
//     return fetch(event.request);
//   }).then(function(response) {
//     caches.open(VERSION).then(function(cache) {
//       cache.put(event.request, response);
//     });
//     return response.clone();
//   }).catch(function() {
//      return caches.match('./static/1.jpg');
//   }));
// });

// 捕获请求并返回缓存数据  这里有些问题，不知道是什么问题
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(response) {
    console.log('response:', response);
    caches.open(VERSION).then(function(cache) {
      cache.put(event.request, response);
     console.log(cache);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('./static/1.jpg');
  }));
});