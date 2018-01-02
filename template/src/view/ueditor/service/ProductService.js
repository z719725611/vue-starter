import Fetch from '../../../utils/Fetch';

const PRODUCT_LIST_URL = '/demo/product/list';
const PROUDCT_DETAIL_URL = '/demo/product/detail';

export default {
  getProductList() {
    return Fetch({
      url: PRODUCT_LIST_URL
    });
  },

  getProductDetail(id, imgSrc, title, text) {
    return Fetch({
      url: PROUDCT_DETAIL_URL,
      method: 'get',
      params: { id, imgSrc, title, text }
    });
  }
};
