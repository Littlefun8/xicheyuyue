const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    count:5
  },
  onLoad() {
    
  },
  delete(e) {
    wx.showModal({
      title: '提示',
      content: '是否要删除评论？',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          var orderid = e.currentTarget.dataset.orderid
          db.collection('comment').doc(id).remove().then(res => {
            
            db.collection('orders').doc(orderid).update({
              data: {
                iscomment:false
              }
            }).then(res => {
              console.log(res)
              wx.showToast({
                title: '删除成功',
              })
            })
            this.onShow()

          })
        }
      }
    })

  },
  onShow() {
    var loginId = wx.getStorageSync('loginId')
    wx.cloud.callFunction({
      name: "lookupcomment",
      data: {
        match_value: loginId,
      }
    }).then(res => {
      console.log(res)
      this.setData({
        res: res.result.list.reverse()
      })
      wx.hideLoading()

    })
  }
})