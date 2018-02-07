import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import router from '../router';
import authService from '../service/AuthenticationService';
import store from '../store';

const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (authService.getUserInfo()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.dynamicRoutes == null) {
        store.dispatch('GenerateRoutes').then((data) => {
          if (!data || data.length === 0) {
            router.push({
              path: '/403',
              name: '无权'
            });
          } else {
            router.addRoutes(store.getters.dynamicRoutes);
            next({ ...to });
          }
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

