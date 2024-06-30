// app.js
App({
  //小程序一启动就会执行
  onLaunch() {
    wx.cloud.init({
      env: 'yao-6gazssv78c712993' //云开发环境ID
    })

  },
  globalData: {
    booktype: [],
    workplace: []
  }
})