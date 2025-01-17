const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {

  },
  save(e) {
    var form = e.detail.value
    console.log(form);

    db.collection('user').doc(this.data.res._id).update({
      data: {
        ...form
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '修改成功',
      })
      this.onShow()
    })
  },
  onLoad(e) {
    var id = e.id
    db.collection('user').doc(id).get().then(res => {
      console.log(res)
      this.setData({
        res: res.data
      })
    })
  },
  onChooseAvatar(e) {
    console.log(e);

    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
    wx.cloud.uploadFile({ //上传至微信云存储
      cloudPath: 'myImage/' + new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + ".jpg", //使用时间戳加随机数作为上传至云端的图片名称
      filePath: avatarUrl, // 本地文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功", res.fileID)
        var image = res.fileID

        var loginId = this.data.res._id
        db.collection('user').doc(loginId).update({
          data: {
            tx: image
          }
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: '修改成功',
          })
          this.onShow()
        })
        wx.showToast({
          title: '上传成功',
        })
      }
    })
    console.log(avatarUrl);

  },
  exit() {
    wx.showModal({
      title: '提示',
      content: '是否要退出？',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {
          wx.clearStorage()
          wx.showToast({
            title: '退出成功',
            icon: 'none'
          })
          setTimeout(() => {
            wx.reLaunch({
              url: '../index/index',
            })
          }, 2000);
        }
      }
    })
  },
  onShow() {
    var loginmsg = wx.getStorageSync('loginmsg')
    var id=loginmsg._id
    db.collection('user').doc(id).get().then(res => {
      console.log(res)
      this.setData({
        res: res.data
      })
    })

  }
})