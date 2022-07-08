const path = require('path')
const { getLoader, loaderByName } = require('@craco/craco')

const packages = []
packages.push(path.join(__dirname, '../base-ui'))
packages.push(path.join(__dirname, '../../../client/src/components'))

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      // 處理 babel loader 的編譯
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'))
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include]

        match.loader.include = include.concat(packages)
      }

      // 處理引用 src 外的文件
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      )
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)

      // 處理多個 react
      webpackConfig.resolve.alias['react'] = path.resolve(__dirname, 'node_modules/react')

      return webpackConfig
    },
  },
}
