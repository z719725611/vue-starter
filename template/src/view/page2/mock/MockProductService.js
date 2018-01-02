import Mock from 'mockjs';
import MockUtils from '../../../utils/MockUtils';

const productList = [];

for (let i = 0; i < 100; i++) {
  productList.push(Mock.mock({
    id: '0',
    title: '@cword(3,10)',
    text: '@cparagraph(50, 500)',
    isDisabled: '@boolean',
    imgsrc: '@image(200x200, @hex)'
  }));
}

export default {
  getProductList() {
    return MockUtils.buildSuccessResult(productList);
  },

  getProductDetail(config) {
    const paramObj = MockUtils.param2Obj(config.url);
    const detail = Mock.mock({
      id: paramObj.id,
      author: '@cname',
      title: paramObj.title,
      text: paramObj.text,
      imgSrc: paramObj.imgSrc,
      date: '@date("yyyy-MM-dd")'
    });
    return MockUtils.buildSuccessResult(detail);
  }
};
