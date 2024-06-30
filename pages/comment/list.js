const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {

  },
  onLoad(e) {
    var id = e.id
    this.setData({
      id,
    })
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
                iscomment: false
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
      name: "lookup",
      data: {
        name: 'comment',
        from: 'order',
        localField: 'ordermsg._id',
        foreignField: '_id',
        as: 'ordermsg',
        match_name: 'ghserver',
        match_value:this.data.id
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