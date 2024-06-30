const db = wx.cloud.database()
Page({
    data: {
        list: [],
        active: 0,
    },
    onChange(event) {
       
    },
    topay(e) {
        console.log(e)
        var ispay = e.currentTarget.dataset.ispay
        var id = e.currentTarget.dataset.id
        if (ispay) {
            wx.showToast({
                title: '已支付',
                icon: "none"
            })
        } else {
            wx.navigateTo({
                url: '../topay/topay?id=' + id,
            })
        }
    },
    delete(e) {
        wx.showModal({
            title: '提示',
            content: '是否取消',
            complete: (res) => {
                if (res.cancel) {

                }

                if (res.confirm) {
                    wx.showLoading({
                        title: '正在操作',
                    })
                    var id = e.currentTarget.dataset.id
                    db.collection('order').doc(id).remove().then(res => {
                        wx.showToast({
                            title: "已取消",
                            icon: "none"
                        })
                        this.onLoad()
                    })

                }
            }
        })
        console.log(e)

    },
    confirmText(e) {
        var id = e.currentTarget.dataset.id
        var status = e.currentTarget.dataset.status
        console.log(status);
        if (status=='已完成') {
            return
        }
        wx.showModal({
            title: '提示',
            content: status + '？',
            complete: (res) => {
                if (res.cancel) {

                }

                if (res.confirm) {
                    // tode
                    if (status == '去支付') {
                        wx.navigateTo({
                            url: '../topay/topay?id=' + id,
                        })
                    }
                    if (status == '评论') {
                        wx.navigateTo({
                            url: '../comment/add?id=' + id,
                        })
                    }
                    if (status == '确认完成') {
                        db.collection('order').doc(id).update({
                            data: {
                                isend: true
                            }
                        }).then(res => {
                            console.log(res)
                            wx.showToast({
                                title: '操作成功',
                            })
                            setTimeout(() => {
                                this.onLoad()
                            }, 1000);
                        })
                    }

                }
            }
        })
    },
    onShow() {
        this.onLoad()
    },
    onLoad() {
        wx.showLoading({
            title: '正在加载',
        })
        wx.cloud.callFunction({
            name: "lookup3",
            data: {
                userid: wx.getStorageSync('loginmsg')._id
            }
        }).then(res => {
            console.log(res)
            this.setData({
                res: res.result.list.reverse()
            })

            wx.hideLoading()

        })
        wx.cloud.callFunction({
            name: "getallorderbyid",
            data: {
                userid: wx.getStorageSync('loginmsg')._id
            }
        }).then(res => {
            console.log(res)
            this.setData({
                list: res.result.data.reverse()
            })
            wx.hideLoading()
        })
    }
})