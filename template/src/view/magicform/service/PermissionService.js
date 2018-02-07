import Fetch from '../../../utils/Fetch';

export const PERMISSION_MENU_URL = '/menu/list';
export const PERMISSION_PERSON_URL = '/current/permission';
export const HAS_PERMISSION = '/demo/auth/hasPermission';

export default {
  getPersonMenu() {
    return Fetch({
      url: PERMISSION_MENU_URL,
      method: 'post'
    });
  },
  getPersonPermission() {
    return Fetch({
      url: PERMISSION_PERSON_URL,
      method: 'post'
    });
  },
  hasPermission(resourceCode) {
    return Fetch({
      url: HAS_PERMISSION,
      method: 'get',
      params: { resourceCode }
    });
  }
};
