module.exports = {
  // 代理跨域
  proxy: {
    '/api': {
      target: 'http://xxxxxxx',
      pathRewrite: { '^/api': '' },
      secure: false,
      changeOrigin: true,
    },
  },
};
