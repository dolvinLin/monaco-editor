const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['json', 'xml', 'html', 'javascript', 'css', 'scss', 'st']
      })
    ]
  },
  transpileDependencies: true
})
