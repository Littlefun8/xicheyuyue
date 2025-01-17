Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: [],
    show: false,
    keshiinfo: {}
  },

  toall(e) {
    var res = this.data.res
    var id = res._id
    wx.navigateTo({
      url: '../comment/list?id=' + id,
    })
  },
  onDisplay() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    var date = this.formatDate(event.detail)
    
    this.setData({
      show: false,
      date: date
    });

    var doctor = this.data.res.name
    var type = this.data.keshiinfo.typename
    var maxNum = this.data.res.maxNum
    var docid = this.data.res._id
    //跳转到ghbook
    wx.navigateTo({
      url: `../ghbook/ghbook?doctor=${doctor}&date=${date}&type=${type}&maxNum=${maxNum}&docid=${docid}`,
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    var id = options.id
    wx.cloud.callFunction({
      name: 'getserverbyid',
      data: {
        id: id
      }
    }).then(res => {
      console.log(res)
      this.setData({
        res: res.result.data
      })
      wx.cloud.callFunction({
        name: "gettypenamebyid",
        data: {
          id: res.result.data.type
        }
      }).then(Res => {
        console.log(Res)
        this.setData({
          keshiinfo: Res.result.data
        })
      })
      wx.hideLoading({
        success: (res) => {},
      })
    })
  },
  book() {
    this.onDisplay()

  }

})