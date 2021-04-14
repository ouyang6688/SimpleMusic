module.exports = {
  // lintOnSave: false
  devServer:{
    proxy:{
      "/":{
        // target:"http://musicapi.leanapp.cn/",
        // target:"http://192.168.54.3:3000",
        target:"http://192.168.54.21:3000",
        changeOrigin:true,
      }
    }
  }
}
