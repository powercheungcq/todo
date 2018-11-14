// const docsLoader = require.resolve('./docs_loader.js')
module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: false // 是否将component 内css打包到css文件
    // cssModules:{
    //   modules:true,
    //   localIdentName:isDev ? '[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
    //   camelCase:true
    // }
    // hotReload:false , //根据环境变量生成
    // loaders:{
    //   'docs':docsLoader
    // }
  }
}
