import Vue from 'vue';
import Router from 'vue-router';
import PageTransition from '../../../components/PageTransition/index.vue';

const importer = require(`./_import_${process.env.NODE_ENV}`);
Vue.use(Router);

export const constantRoutes =
  [
    {
      path: '/',
      component: PageTransition,
      children: [{
        name: 'List',
        path: '',
        component: importer('List')
      }, {
        name: 'Detail',
        path: '/detail',
        component: importer('Detail')
      }]
    },
  ];
export default new Router({
  mode: 'hash',   // 强制使用hash模式进行导航，不能指望服务器支持history
  routes: constantRoutes  // （缩写）相当于 routes: routes
});
