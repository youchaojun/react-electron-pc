const CracoLessPlugin = require('craco-less');
const lessGlobal = require('./lessGlobal');

module.exports = {
  plugin: CracoLessPlugin,
  options: {
    modifyLessRule(lessRule) {
      lessRule.exclude = [];
      const findLoaderIndex = (name) =>
        lessRule.use.findIndex((item) => `${item.loader}`.includes(name));

      // copy and mod
      const cssModuleIndex = findLoaderIndex('css-loader');
      const cssModule = lessRule.use[cssModuleIndex];

      cssModule.options.sourceMap = false;
      cssModule.options.modules = {
        auto: true,
        localIdentName: '[local]_[hash:4]',
      };

      const lessModuleIndex = findLoaderIndex('less-loader');
      const lessModule = lessRule.use[lessModuleIndex];

      lessModule.options.lessOptions = {
        javascriptEnabled: true,
        modifyVars: lessGlobal,
      };

      // replace
      lessRule.use.splice(cssModuleIndex, 1, cssModule);
      lessRule.use.splice(lessModuleIndex, 1, lessModule);
      // console.log(cssModule, lessModule); process.exit(0);

      return lessRule;
    },
  },
};
