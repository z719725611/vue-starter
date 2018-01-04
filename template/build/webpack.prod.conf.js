'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const html_template_generator = require('./plugin/webpack/generate_html_template_list');
const map_json_generator = require('./plugin/webpack/generate_map_json');
const QiniuPlugin = require('qiniu-webpack-plugin');

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : process.env.NODE_ENV === 'debug' ? require('../config/debug.env') : require('../config/prod.env');

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name]/js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // UEDITOR_HOME_URL 定义指定生产环境引用ueditor相关资源的路径
    new webpack.DefinePlugin({
      'process.env': env,
      UEDITOR_HOME_URL:JSON.stringify("https://cdns1.dajiashequ.com/" + config.build.projectName + "/ueditor/js/"),
      UEDITOR_INIT_URL:JSON.stringify("/file/initUeditor")
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('[name]/css/[name].[contenthash].css'),
      // set the following option to `true` if you want to extract CSS from
      // codesplit chunks into this main css file as well.
      // This will result in *all* of your app's CSS being loaded upfront.
      allChunks: false,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    }),
    new QiniuPlugin({
      ACCESS_KEY: config.build.CDN_AK,
      SECRET_KEY: config.build.CDN_SK,
      bucket: config.build.CDN_BUCKET,
      path: '',

      /**
       *  You can specify certain file to upload
       */
      //include: [],
    }),
  ].concat(html_template_generator.generate_html_template_list(env)).concat([
	  new CopyWebpackPlugin([
		  {
			  from: path.resolve(__dirname, '../static'),
			  to: config.build.assetsSubDirectory,
			  ignore: ['.*']
		  }
	  ]),
    // map.json插件
    map_json_generator.generate_map_json({
      // output file path, relative to process.cwd()
      output: './map/' + config.project_config.name + '/map' + '.json',
      assetsPath: config.build.assetsPublicPath, // 文件前缀地址
      static_root: config.project_config.static_root, // 静态资源根路径
    })
  ])
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
