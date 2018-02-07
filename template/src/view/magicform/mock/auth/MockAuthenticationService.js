import MockUtils from '../../../../utils/MockUtils';

const userMap = {
  wangxin: {
    personID: '1755989259448765391',
    password: '123456',
    avatar: 'https://cdns1.dajiashequ.com/temp/wx/qrcode/appMoble_bigPhoto.png',
    name: '王鑫'
  }
};

export default {
  loginByUsername: (config) => {
    const { username, password } = MockUtils.param2Obj(config.url);
    const userInfo = userMap[username];
    if (password === userInfo.password) {
      return MockUtils.buildSuccessResult({
        token: userInfo.personID,
        personID: userInfo.personID,
        username: username,
        name: userInfo.name,
        avatar: userInfo.avatar
      });
    }
    return MockUtils.buildFailedResult(10001, '登录失败，用户名密码错误!');
  },

  logout: () => {
    return MockUtils.buildSuccessResult({ msg: '退出系统成功' });
  }
};
