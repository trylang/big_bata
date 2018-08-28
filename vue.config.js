const path = require('path')

// 拼接路径
function resolve (dir) {
  return path.join(__dirname, dir)
}

// 基础路径 注意发布之前要先修改这里
const baseUrl = '/'

module.exports = {
  baseUrl: baseUrl, // 根据你的实际情况更改这里
  lintOnSave: true,
  devServer: {
    publicPath: baseUrl, // 和 baseUrl 保持一致
    proxy: {
      // 在这里配置如下代码
      '/api': {
        // target: 'http://123.59.0.194:8010/', // 你请求的第三方接口
        target: 'http://123.59.0.194:8030/', // 你请求的第三方接口
        // target: 'http://localhost:3000/bi/', // 你请求的第三方接口
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        // ws: true,
        secure: false,
        pathRewrite: {
          // 路径重写，
          '^/api': '/' // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可。
        }
      }
    }
  },
  // webpack 设置
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('^', resolve('static'))
    // babel-polyfill 加入 entry
    const entry = config.entry('app')
    entry.add('babel-polyfill').end()
  }
}
