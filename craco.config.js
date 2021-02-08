// const CracoLessPlugin = require('craco-less');
const path = require('path');
const CracoAlias = require('craco-alias');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const webpack = require('webpack');
const cracoPluginLess = require('./config/craco-plugin--less');
const proxyServce = require('./config/proxyServce');

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);
module.exports = {
  devServer: proxyServce,
  webpack: {
    alias: {
      '@': pathResolve('src'),
      '@components': pathResolve('src/components'),
      '@pages': pathResolve('src/pages'),
      '@models': pathResolve('src/pages'),
      '@services': pathResolve('src/services'),
    },
    plugins: [
      new AntdDayjsWebpackPlugin(),
      // 打压缩包
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 500,
        minRatio: 0.8,
      }),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new SimpleProgressWebpackPlugin(),
    ],
    configure: (webpackConfig) => {
      // 为了方便使用 electron 以及 node.js 相关的 api
      // 需要将 target 设置为 electron-renderer
      // 设置了 target 之后，原生浏览器的环境将无法运行此 react 项目(因为不支持 node.js 相关的 api)，会抛出 Uncaught ReferenceError: require is not defined 异常
      // 需要在 electron 的环境才能运行(因为支持 node.js 相关的 api)
      // 这一步的操作, 都是为了能与 electron 进行更好的集成
      if (webpackConfig.mode === 'production') {
        webpackConfig.target = 'electron-renderer';
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
        };
        webpackConfig.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log'],
              },
              mangle: false,
              output: {
                beautify: true,
              },
            },
            sourceMap: false,
            parallel: true,
          })
        );
      }
      return webpackConfig;
    },
  },
  plugins: [
    cracoPluginLess,
    {
      plugin: CracoAlias,
      options: {
        sourceMap: false,
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  babel: {
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
  },
};
