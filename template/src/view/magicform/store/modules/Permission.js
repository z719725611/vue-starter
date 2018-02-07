import permissionService from '../../service/PermissionService';
import { componentMap, constantRoutes } from '../../router';

const importer = require(`../../router/_import_${process.env.NODE_ENV}`);
const component = importer('layout/Layout');
const placeHolder = 'layout/PlaceHolder';

function getLinkRoutes(result, currentRoute, routeMap) {
  const id = currentRoute.id;
  const name = currentRoute.name;
  const path = currentRoute.path;
  const parentID = currentRoute.parentID;
  const isLink = currentRoute.isLink;
  const isHomePage = currentRoute.isHomePage;
  const resourceCode = currentRoute.resourceCode;

  result.unshift({
    id: id,
    name: name,
    path: path,
    resourceCode: resourceCode,
    isLink: isLink,
    isHomePage: isHomePage
  });
  if (!(parentID === '0' || parentID == null)) {
    const parentRoute = routeMap[parentID];
    getLinkRoutes(result, parentRoute, routeMap);
  }
}


function buildRootRouteWithoutChildren(permission) {
  let encodingResourceCode = 'index';
  if (permission.resourceCode) {
    encodingResourceCode = encodeURIComponent(permission.resourceCode);
  }
  const result = {
    id: `${permission.id}`,
    path: '',
    component: component,
    icon: permission.icon,
    noDropdown: true,
    resourceCode: encodingResourceCode,
    redirect: encodingResourceCode
  };
  const children = {
    id: permission.id,
    parentID: permission.parentID,
    name: permission.name,
    path: encodingResourceCode,
    resourceCode: encodingResourceCode
  };
  if (permission.isLink) {
    result.isLink = permission.isLink;
    children.url = permission.path;
    children.isLink = permission.isLink;
  } else {
    children.component = componentMap[permission.resourceCode] || placeHolder;
  }
  result.children = [children];
  return result;
}

function buildRootRouteWithChildren(permission, childrenMap) {
  let encodingResourceCode = 'index';
  if (permission.resourceCode) {
    encodingResourceCode = encodeURIComponent(permission.resourceCode);
  }
  const childPermission = childrenMap[permission.id][0];
  const newPath = permission.isHomePage ? '' : `/${encodingResourceCode}`;
  const result = {
    id: permission.id,
    parentID: permission.parentID,
    path: '',
    component: component,
    redirect: `${newPath}/${encodeURIComponent(childPermission.resourceCode)}`,
    name: permission.name,
    icon: permission.icon,
    isLink: permission.isLink,
    resourceCode: encodingResourceCode
  };
  return result;
}

// 叶子节点（入口菜单）
function buildChildrenRouteWithoutChildren(permission) {
  let encodingResourceCode = '';
  if (permission.resourceCode) {
    encodingResourceCode = encodeURIComponent(permission.resourceCode);
  }
  const result = {
    id: permission.id,
    parentID: permission.parentID,
    path: encodingResourceCode,
    name: permission.name,
    resourceCode: encodingResourceCode
  };
  if (permission.isLink) {
    result.url = permission.path;
    result.isLink = permission.isLink;
  } else {
    result.component = componentMap[permission.resourceCode] || placeHolder;
  }
  return result;
}

// 中间节点
function buildChildrenRouteWithChildren(permission, childrenMap, state) {
  let encodingResourceCode = 'index';
  if (permission.resourceCode) {
    encodingResourceCode = encodeURIComponent(permission.resourceCode);
  }
  const childPermission = childrenMap[permission.id][0];
  const linkRoutes = [];
  getLinkRoutes(linkRoutes, permission, state.routeMap);
  let redirect = '';
  for (const linkRoute of linkRoutes) {
    if (!linkRoute.isHomePage && linkRoute.resourceCode) {
      redirect = `${redirect}/${encodeURIComponent(linkRoute.resourceCode)}`;
    }
  }
  const result = {
    id: permission.id,
    parentID: permission.parentID,
    resourceCode: encodingResourceCode,
    name: permission.name,
    path: redirect,
    redirect: `${redirect}/${encodeURIComponent(childPermission.resourceCode)}`
  };
  if (permission.isLink) {
    result.url = permission.path;
    result.isLink = permission.isLink;
  } else {
    result.component = importer(placeHolder);
  }
  return result;
}

function buildRouter(permission, childrenMap, parentPermission, state) {
  const id = permission.id;
  let result = null;
  if (!parentPermission) {
    if (!childrenMap[id]) {
      result = buildRootRouteWithoutChildren(permission, childrenMap);
    } else {
      result = buildRootRouteWithChildren(permission, childrenMap);
    }
  } else {
    if (!childrenMap[id]) {
      result = buildChildrenRouteWithoutChildren(permission, childrenMap);
    } else {
      result = buildChildrenRouteWithChildren(permission, childrenMap, state);
    }
  }
  return result;
}

function permissionRank(array) {
  array.sort(function (a, b) {
    return a.sort - b.sort;
  });
}

function buildPermissionTree(parentPermission, rootPermissionArray, childrenMap, state) {
  const result = [];
  for (const permission of rootPermissionArray) {
    const permissionRouter = buildRouter(permission, childrenMap, parentPermission, state);
    if (parentPermission === null) {
      result.push(permissionRouter);
    } else {
      parentPermission.children.push(permissionRouter);
    }
    const childrenPermission = childrenMap[permission.id];
    if (childrenPermission) {
      permissionRouter.children = [];
      buildPermissionTree(permissionRouter, childrenPermission, childrenMap, state);
    }
  }
  return result;
}

function handlePermission(permissionArray, state) {
  const rootPermissionArray = []; // 根节点的菜单权限数组
  const childrenMap = {}; // 子节点权限映射，key=parentID，value=菜单权限
  // 1.将根节点菜单权限找出，并且建立子节点父ID到节点的映射
  for (const permission of permissionArray) {
    if (permission.parentID === '0' || permission.parentID == null) {
      rootPermissionArray.push(permission);
    } else {
      let childrenArray = childrenMap[permission.parentID];
      if (!childrenArray) {
        childrenArray = [];
        childrenMap[permission.parentID] = childrenArray;
      }
      childrenArray.push(permission);
      permissionRank(childrenArray);
    }
  }
  permissionRank(rootPermissionArray);
  return buildPermissionTree(null, rootPermissionArray, childrenMap, state);
}

function buildPermissionMap(permissionArray) {
  const permissionMap = {};
  for (const permission of permissionArray) {
    permissionMap[permission.id] = permission;
  }
  return permissionMap;
}

const permission = {
  state: {
    routes: constantRoutes,
    dynamicRoutes: null,
    routeMap: {},
    isLink: false,
    linkRoutes: [],
    iframeUrl: ''
  },

  mutations: {
    SET_ROUTES: (state, routes) => {
      state.dynamicRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },

    SET_ROUTEMAP: (state, routeMap) => {
      state.routeMap = routeMap;
    },

    SET_LINK_STATUS: (state, isLink) => {
      state.isLink = isLink;
    },

    SET_IFRAMEURL_STATUS: (state, iframeUrl) => {
      state.iframeUrl = iframeUrl;
    },

    SET_LINK_ROUTES: (state, menu) => {
      if (menu.isLink) {
        state.linkRoutes.splice(0, state.linkRoutes.length);
        getLinkRoutes(state.linkRoutes, menu, state.routeMap);
      }
    }
  },

  actions: {
    GenerateRoutes({ commit, state }) {
      return new Promise((resolve, reject) => {
        permissionService.getPersonMenu().then((data) => {
          commit('SET_ROUTEMAP', buildPermissionMap(data));
          commit('SET_ROUTES', handlePermission(data, state));
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },

    ChangeRouterWay({ commit }, payload) {
      if (payload.child) {
        commit('SET_LINK_STATUS', payload.child.isLink);
        commit('SET_IFRAMEURL_STATUS', payload.child.url);
        commit('SET_LINK_ROUTES', payload.child);
      } else {
        commit('SET_LINK_STATUS', payload.item.isLink);
      }
    }
  }
};

export default permission;
