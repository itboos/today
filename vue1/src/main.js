// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue';
// import App from './App';
// import router from './router';

// Vue.config.productionTip = false;

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App },
// });
console.log('main.js开始....');
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';

import Home from './components/Home';
import Search from './components/Search';
import girl from './components/girl';

import VueResource from 'vue-resource'
import store from './store'
//console.log('store:',store);

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
    path: '/',
    component: Home
},{
    path: '/home',
    component: Home
},{
    path: '/search',
    component: Search
},{
    path: '/gf/:id/post/:post_id',
    component: girl
}]
 const router = new VueRouter( {
    routes
 })
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
console.log('main.js结束....')

// import VueResource from 'vue-resource'
// import store from './store'

// Vue.use(VueResource)

// new Vue({
//     // el: '#app',
//     router,
//     store,
//     ...App
// }).$mount('#app')

/* eslint-disable no-new */
// new Vue({
//     router,
//     ...App
// }).$mount('#app') 