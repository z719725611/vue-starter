// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'hui/dist/css/hui.min.css';
import HUI from 'hui';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Navigation from 'vue-navigation';
import 'babel-polyfill';
import main from './main.vue';
import routes from './router';
import store from './store';
import './mock/index';

Vue.config.productionTip = false;

VueRouter.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1);
};

const router = new VueRouter({
  mode: 'hash',   // 强制使用hash模式进行导航，不能指望服务器支持history
  routes
});

Vue.use(VueRouter);
Vue.use(Navigation, { router, store });
Vue.use(HUI);

/* eslint-disable no-new */
new Vue({
  render: h => h(main),
  router,
  store
}).$mount('#app');
