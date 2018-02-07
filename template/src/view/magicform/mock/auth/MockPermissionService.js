import MockUtils from '../../../../utils/MockUtils';

const permissionList = [
    { id: '3', name: '子菜单2', icon: 'zuzhixinxi', parentID: '1', path: 'subMenu2', resourceCode: 'subMenu2', sort: 2, isSidebar: true },
    { id: '6', name: '孙子菜单1', icon: 'zuzhixinxi', parentID: '3', path: 'subSubMenu1', resourceCode: 'subSubMenu1', sort: 1, isSidebar: true },
    { id: '4', name: '菜单2', icon: 'zuzhixinxi', parentID: '0', path: 'menu2', resourceCode: 'menu2', sort: 2, isSidebar: true, isHomePage: false },
    { id: '5', name: '按钮3', icon: 'zuzhixinxi', parentID: '0', path: 'menu3', resourceCode: 'menu3', sort: 3, isSidebar: false },
    { id: '1', name: '菜单1', icon: 'zuzhixinxi', parentID: '0', path: 'menu1', resourceCode: 'menu1', sort: 1, isSidebar: true, isHomePage: false },
    { id: '2', name: '子菜单1', icon: 'zuzhixinxi', parentID: '1', path: 'subMenu1', resourceCode: 'subMenu1', sort: 10, isSidebar: true },
    { id: '7', name: '外部链接', icon: 'zuzhixinxi', parentID: '0', path: 'https://www.baidu.com', resourceCode: 'wb1', sort: '3', isSidebar: true, isLink: true },
    { id: '8', name: '淘宝', icon: 'zuzhixinxi', parentID: '7', path: 'https://www.taobao.com', resourceCode: 'wb2', sort: '2', isSidebar: true, isLink: true },
    { id: '9', name: '百度', icon: 'zuzhixinxi', parentID: '0', path: 'https://www.baidu.com', resourceCode: 'wb3', sort: '1', isSidebar: true, isLink: true, isHomePage: true },
    { id: '10', name: '大家', icon: 'zuzhixinxi', parentID: '8', path: 'http://www.dajiashequ.com', resourceCode: 'wb4', sort: '2', isSidebar: true, isLink: true },
    { id: '11', name: 'qq', icon: 'zuzhixinxi', parentID: '10', path: 'http://www.qq.com', resourceCode: 'wb5', sort: '2', isSidebar: true, isLink: true },
    { id: '12', name: '163', icon: 'zuzhixinxi', parentID: '7', path: 'http://www.163.com', resourceCode: 'wb6', sort: '1', isSidebar: true, isLink: true }
];

export default {
  getPersonMenu: () => {
    return MockUtils.buildSuccessResult(permissionList);
  },

  hasPermission: (config) => {
    const { resourceCode } = MockUtils.param2Obj(config.url);
    if (resourceCode === 'wangxin') {
      return MockUtils.buildSuccessResult(true);
    }
    return MockUtils.buildSuccessResult(false);
  }
};
