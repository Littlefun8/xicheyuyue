const app = getApp()
const db = wx.cloud.database()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        workplace: [],
        serverList: [],
        List: {},
        search: '',
        iconList: [{
            icon: 'edit',
            color: 'red',
            name: '预约记录'
        }, {
            icon: 'profile',
            color: 'orange',
            badge: 1,
            name: '修改个人信息'
        }, {
            icon: 'timefill',
            color: 'orange',
            badge: 0,
            name: '程序介绍'
        }],
    },
    click(e) {
        console.log(e)
        var name = e.currentTarget.dataset.item.name
        if (name == '预约记录') {
            wx.navigateTo({
                url: '../myguahao/myguahao',
            })
        } else if (name == '修改个人信息') {
            var loginmsg = wx.getStorageSync('loginmsg')
            var id = loginmsg._id
            wx.navigateTo({
                url: '../alterMsg/altmsgs?id='+id,
            })
        } else {
            wx.navigateTo({
                url: '../about/about',
            })
        }
    },
    // 输入框的值该改变 就会触发的事件
    searchinput(e) {
        console.log(e)
        this.setData({
            search: e.detail.value
        })
    },
    search(e) {
        wx.navigateTo({
            url: '../search/search?search=' + this.data.search,
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log("show", app.globalData.workplace)
        var phone = wx.getStorageSync('loginmsg').phone
        var msg = wx.getStorageSync('msg')
        if (!phone) {
            wx.navigateTo({
                url: '../login/login',
            })
            return
        }
        wx.showLoading({
            title: '正在加载',
        })
        this.setData({
            workplace: app.globalData.workplace
        })
        wx.cloud.callFunction({
            name: 'getallserver'
        }).then(res => {
            console.log(res)
            this.setData({
                serverList: res.result.data
            })
            wx.hideLoading({
                success: (res) => {},
            })
        })
    },
    todetail(e) {
        console.log(e)
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../serverdetail/serverdetail?id=' + id,
        })
    },
    onLoad() {
        wx.showLoading({
            title: '正在加载',
        })
        db.collection('type').get().then(res => {
            console.log('请求成功', res)
            this.setData({
                serverList: res.data
            })

            wx.hideLoading()
        })
    }
})