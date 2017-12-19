"use strict";

let name = '{{name}}';
let debugWebServiceName = '{{debugWebServiceName}}';
let debugWebServiceResourcePath = '../../' + debugWebServiceName + '/src/main/resources/';

	module.exports = {
    name: name, // 项目名：multi
    static_root: name,//静态资源路径(线上的assets,html,js文件夹所在路径)
    debugWebServiceResourcePath: debugWebServiceResourcePath, // 调试目录
    project: {
        // 项目列表
        // 组织格式 ： 项目名 => 以项目根目录为基准的index.vue路径
        // 其在webpack中的对应格式为：[name](生成的js名) => [main.js所在路径]
      page1: './src/view/page1', // 示例项目，利用个人blog提供公共api进行测试
      page2: './src/view/page2', // 示例项目，利用个人blog提供公共api进行测试
    },
    entry: {
      page1: '/' + name + "/page1/index.html",
      page2: '/' + name + "/page2/index.html"
    }
};
