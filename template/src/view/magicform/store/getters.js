const Getters = {
  avatar: state => state.auth.avatar,
  permission: state => state.auth.permission,
  dynamicRoutes: state => state.permission.dynamicRoutes,
  permissionRouters: state => state.permission.routes,
  routeMap: state => state.permission.routeMap,
  isLink: state => state.permission.isLink,
  iframeUrl: state => state.permission.iframeUrl,
  linkRoutes: state => state.permission.linkRoutes,
  sidebar: state => state.sidebarStatus.sidebar
};

export default Getters;
