import Vue from 'vue';
import Router from 'vue-router';

/**
 * in development env not use Lazy Loading,
 * because Lazy Loading too many pages will
 * cause webpack hot update too slow.so only
 * in production use Lazy Loading
 */
const importer = require(`./_import_${process.env.NODE_ENV}`);

export const componentMap = {
  menu1: null,
  subMenu1: importer('introduction/Introduction'),
  subMenu2: null,
  menu2: importer('introduction/Introduction'),
  menu3: importer('introduction/Introduction'),
  subSubMenu1: importer('introduction/Introduction')
};

Vue.use(Router);

export const constantRoutes =
  [
    {
      path: '/login',
      component: importer('login/Login'),
      hidden: true
    }
    // {
    //   path: '/menu2',
    //   component: importer('layout/Layout'),
    //   name: '菜单2',
    //   icon: 'zuzhixinxi',
    //   redirect: '/menu2/index',
    //   noDropdown: true,
    //   children: [{
    //     path: 'index',
    //     component: importer('introduction/Introduction3'),
    //     name: '菜单2',
    //     icon: 'zuzhixinxi'
    //   }]
    // },
    // {
    //   id: 's',
    //   path: '',
    //   component: importer('layout/Layout'),
    //   name: '超链测试',
    //   icon: 'zuzhixinxi',
    //   redirect: '/ss',
    //   isLink: true,
    //   // noDropdown: true,
    //   children: [{
    //     id: 'ss',
    //     path: '/ss',
    //     // url: 'http://www.baidu.com',
    //     // component: importer('layout/Layout'),
    //     name: '试1',
    //     icon: 'zuzhixinxi',
    //     // redirect: '/ss/sss',
    //     isLink: true,
    //     // noDropdown: true,
    //     children: [
    //       {
    //         id: 'sss',
    //         // redirect: '/ssss',
    //         path: '/ss/sss',
    //         // url: 'http://www.baidu.com',
    //         // component: importer('layout/Layout'),
    //         name: '试2',
    //         icon: 'zuzhixinxi',
    //         isLink: true,
    //         children: [
    //           {
    //             id: 'ssss',
    //             path: 'ssss',
    //             url: 'http://www.qq.com',
    //             // component: importer('layout/PlaceHolder'),
    //             name: '试3',
    //             icon: 'zuzhixinxi',
    //             isLink: true
    //           }
    //         ]
    //       }
    //     ]
    //   }
    //   ]
    // }
  ];
export default new Router({
  mode: 'hash',   // 强制使用hash模式进行导航，不能指望服务器支持history
  routes: constantRoutes  // （缩写）相当于 routes: routes
});
