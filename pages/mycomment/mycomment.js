Page({

    /**
     * 页面的初始数据
     */
    data: {
        res: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.cloud.callFunction({
            name: "getallcomment",
            data: {
                userid: wx.getStorageSync('loginId')
            }
        }).then(res => {
            console.log(res)
            this.setData({
                res: res.result.list.reverse()
            })
        })
    },
    delete(e) {

        var id = e.currentTarget.dataset.id
        const db = wx.cloud.database();
        const _ = db.command;
        wx.showModal({
          title: '提示',
          content: '是否要删除',
          complete: (res) => {
            if (res.cancel) {
              
            }
        
            if (res.confirm) {
                db.collection('comment').doc(id).remove().then(res => {
                    wx.showToast({
                        title: '删除成功',
                    })
                    this.onShow()
        
                })
            }
          }
        })
    },
})