import Cookies from 'js-cookie';
import Fetch from '../../../utils/Fetch';

const USER_INFO_KEY = 'user-info';
const WEB_TOKEN_KEY = 'dajiaID';

export const AUTH_LOGIN_URL = '/auth/login';
export const AUTH_LOGOUT_URL = '/auth/logout';
export const AUTH_VCODE_SMS_URL = '/auth/logout';

export default {
  loginByUsername(username, password,messageVerify,verify) {
    const data = {
      username,
      password,
      messageVerify,
      verify
    };

    return Fetch({
      url: AUTH_LOGIN_URL,
      method: 'post',
      params: data
    });
  },

  logout() {
    return fetch({
      url: AUTH_LOGOUT_URL,
      method: 'post'
    });
  },

  getSMSCode(username) {
    return Fetch({
      url: AUTH_VCODE_SMS_URL,
      method: 'get',
      params: username
    });
  },

  getUserInfo() {
    const userInfoStr = Cookies.get(USER_INFO_KEY);
    if (userInfoStr) {
      return JSON.parse(userInfoStr);
    }
    return null;
  },

  setUserInfo(userInfo) {
    if(!Cookies.get(WEB_TOKEN_KEY)){
      Cookies.set(WEB_TOKEN_KEY,userInfo.token);
    }
    return Cookies.set(USER_INFO_KEY, JSON.stringify(userInfo));
  },

  removeUserInfo() {
    Cookies.remove(WEB_TOKEN_KEY);
    return Cookies.remove(USER_INFO_KEY);
  }
}
;
