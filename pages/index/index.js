Page({
  onLoad() {
    wx.showLoading({
      title: '正在加载',

    })
    wx.cloud.callFunction({
      name: "getalltype"
    }).then(res => {
      console.log(res)
      this.setData({
        res: res.result.data
      })
      wx.hideLoading()
    })
  },
  tolist(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var typename = e.currentTarget.dataset.item.typename
    wx.setStorageSync('clicktype', typename)
    wx.navigateTo({
      url: '../doctorbykeshi/doctorbykeshi?id=' + id + '&typename=' + typename,
    })
  }
})