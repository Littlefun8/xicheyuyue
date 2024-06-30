const db = wx.cloud.database()
Page({
  data: {
    List: {}
  },
  history() {
    wx.navigateTo({
      url: '../mycomment/mycomment',
    })
  },
  jf() {
    wx.navigateTo({
      url: '../myjf/myjf',
    })
  },
  bl() {
    wx.navigateTo({
      url: '../mybl/mybl',
    })
  },
  about() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  myguahao() {
    wx.navigateTo({
      url: '../myguahao/myguahao',
    })
  },
  exit() {
    wx.showModal({
      title: '提示',
      content: '是否退出',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {
          wx.clearStorage()
          wx.switchTab({
            url: '../server/server',
          })
        }
      }
    })
  },
  alter() {
    var loginmsg = wx.getStorageSync('loginmsg')
    var id = loginmsg._id
    wx.navigateTo({
      url: '../alterMsg/altmsgs?id=' + id,
    })
  },
  onShow(e) {
    var loginmsg = wx.getStorageSync('loginmsg')
    var id = loginmsg._id
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('user').doc(id).get().then(res => {
      console.log(res)
      this.setData({
        res: res.data
      })
      wx.setStorageSync('loginmsg', res.data)
    })
  },
  onLoad() {
    db.collection('user').get().then(res => {
      console.log('请求成功', res)
      this.setData({
        List: res.data
      })

      wx.hideLoading()
    })
  }
})