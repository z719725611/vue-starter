import authService from '../../service/AuthenticationService';
import permissionService from '../../service/PermissionService';

const auth = {
  state: {
    avatar: authService.getUserInfo() ? authService.getUserInfo().avatar : '',
    permission: []
  },

  mutations: {
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission;
    }
  },

  actions: {
    LoginByUsername({ commit }, loginParams) {
      return new Promise((resolve, reject) => {
        authService.loginByUsername(loginParams.username, loginParams.password,
          loginParams.messageVerify, loginParams.verify).then((data) => {
            commit('SET_AVATAR', data.avatar);
            authService.setUserInfo(data);
            permissionService.getPersonPermission().then(() => {
              commit('SET_PERMISSION', data);
            }).catch((error) => {
              reject(error);
            });
            resolve(data);
          }).catch((error) => {
            reject(error);
          });
      });
    },

    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        authService.logout().then(() => {
          commit('SET_TOKEN', '');
          authService.removeUserInfo();
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
};

export default auth;
