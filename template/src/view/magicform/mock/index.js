import Mock from 'mockjs';
import mockAuthService from '../mock/auth/MockAuthenticationService';
import mockPermissionService from '../mock/auth/MockPermissionService';
import { AUTH_LOGIN_URL } from '../service/AuthenticationService';
import { PERMISSION_MENU_URL, HAS_PERMISSION } from '../service/PermissionService';

Mock.setup({
  timeout: '600-1000' // 模拟响应时间
});
//
Mock.mock(new RegExp(AUTH_LOGIN_URL), /post|get/i, mockAuthService.loginByUsername);
Mock.mock(new RegExp(PERMISSION_MENU_URL), /post|get/i, mockPermissionService.getPersonMenu);
Mock.mock(new RegExp(HAS_PERMISSION), /post|get/i, mockPermissionService.hasPermission);
