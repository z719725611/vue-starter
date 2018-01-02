import Mock from 'mockjs';
import MockProductService from './MockProductService';

Mock.mock(/\/demo\/product\/list/, 'get', MockProductService.getProductList);
Mock.mock(/\/demo\/product\/detail/, 'get', MockProductService.getProductDetail);
