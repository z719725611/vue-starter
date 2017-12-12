import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000                 // 请求超时时间
});

// request拦截器
service.interceptors.request.use((config) => {
  // 需要在请求发出前做的全局处理逻辑可以添加在这里
  console.log('请求前预处理...');
  return config;
}, (error) => {
  // 可以在这里统一处理请求错误
  console.log('请求错误处理...'); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use((response) => {
  if (!response.success) {
    console.log('处理错误...');
    return Promise.reject(response.data);
  }
  return response.data;
}, (error) => {
  console.log('处理错误...');
  return Promise.reject(error);
});
export default service;
