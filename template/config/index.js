'use strict';
// Template version: 1.2.5
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const project_config = require('./project.js'); // 在配置生成路径时需要project_config中的相关信息，故预先导入
module.exports = {
  build: {
    // 服务器端配置
    env: require('./prod.env'),
    prodEnv: require('./prod.env'),
    projectName: project_config.name,
    index: path.resolve(__dirname, project_config.publishWebServiceResourcePath + 'html/vue/index.html'),
    htmlRoot: path.resolve(__dirname, project_config.publishWebServiceResourcePath), //html文件根路径
    assetsRoot: path.resolve(__dirname, '../dest/'),// 公共资源地址
    assetsSubDirectory: './' + project_config.static_root + '/',// 子文件夹前缀 // 在webpack2中编译需要加上后缀/ ，否则会报操作错误Error
    assetsPublicPath: project_config.cdnAddr, // 静态地址前缀，使用网址以便对外发布
    productionSourceMap: false,// 是否生成map文件(设成ture会额外生成一份map文件方便前端调试，但是由于vue.js编译后的代码就算加了map也看不懂，所以直接使用false即可)
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    CDN_AK: project_config.cdn_ak,
    CDN_SK: project_config.cdn_sk,
    CDN_BUCKET: project_config.cdn_bucket
  },
  dev: {
    // 本地调试配置
    env: require('./dev.env'),
    port: 8081, // 调试地址端口
    autoOpenBrowser: true,
    assetsSubDirectory: '.',// 子文件夹前缀
    assetsPublicPath: '/',
    proxyTable: {
      // '/api': {
      //     target: 'http://192.168.31.88:8080',
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/api': ''
      //     }
      // }
    }, // 可以在这里配置端口转发(解决本地调试时的跨域问题),这边为了方便，我就直接在dev-server代码中进行修改了
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  debug: {
    // 服务器端配置
    env: require('./debug.env'),
    prodEnv: require('./debug.env'),
    index: path.resolve(__dirname, project_config.debugWebServiceResourcePath + 'html/vue/index.html'),
    assetsRoot: path.resolve(__dirname, project_config.debugWebServiceResourcePath),// 公共资源地址
	  assetsStaticRoot: path.resolve(__dirname, project_config.debugWebServiceResourcePath + 'static'),// 公共资源地址
    assetsSubDirectory: './static/vue/',// 子文件夹前缀 // 在webpack2中编译需要加上后缀/ ，否则会报操作错误Error
    assetsAccessDirectory: './vue/',
    assetsPublicPath: '/', // 静态地址前缀，使用网址以便对外发布
    productionSourceMap: false,// 是否生成map文件(设成ture会额外生成一份map文件方便前端调试，但是由于vue.js编译后的代码就算加了map也看不懂，所以直接使用false即可)
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  project_config: project_config
};
