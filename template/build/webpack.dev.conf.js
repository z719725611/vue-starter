'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const html_template_generator = require('./plugin/webpack/generate_html_template_list');

let project_list = {};
Object.keys(config.project_config.project).forEach(function (name) {
  project_list[name] = ['./build/dev-client'].concat(config.project_config.project[name])
});
baseWebpackConfig.entry = project_list;
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-source-map',
  plugins: [
	  // UEDITOR_HOME_URL 定义指定开发环境引用ueditor相关资源的路径
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
	    UEDITOR_HOME_URL:JSON.stringify("/ueditor/js/"),
	    UEDITOR_INIT_URL:JSON.stringify("/file/initUeditor")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
	  new webpack.ProvidePlugin({
		  jQuery: "jquery",
		  $: "jquery"
	  })
  ].concat(html_template_generator.generate_html_template_list(config.dev.env)).concat([new FriendlyErrorsPlugin()])
});
