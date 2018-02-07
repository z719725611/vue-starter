import 'babel-polyfill';
import Vue from 'vue';
import 'normalize.css/normalize.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/';

import './styles/sidebar.scss';

import main from './main.vue';
import router from './router';
import store from './store';
import SvgIcon from '../../components/SvgIcon/index.vue';
import '../../assets/iconfont/iconfont';
import './permission/PermissionFilter';
import './mock';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.component('svg-icon', SvgIcon);

new Vue({
  render: h => h(main),
  router,
  store
}).$mount('#app');

