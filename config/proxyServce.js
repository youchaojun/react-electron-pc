module.exports = {
  // 代理跨域
  proxy: {
    '/api': {
      target: 'https://getman.cn/mock',
      pathRewrite: { '^/api': '' },
      secure: false,
      changeOrigin: true,
    },
  },
};
