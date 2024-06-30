const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    count: 5,
    active: 4,

  },
  getNowDate: function () {
    var date = new Date();
    var year = date.getFullYear() //年
    var month = date.getMonth() + 1 //月
    var day = date.getDate() //日
    var hour = date.getHours() //时
    var minute = date.getMinutes() //分
    var second = date.getSeconds() //秒
    var xiaoshi = "";
    if (hour < 10) {
      xiaoshi = "0" + hour;
    } else {
      xiaoshi = hour + "";
    }
    var fenzhong = "";
    if (minute < 10) {
      fenzhong = "0" + minute;
    } else {
      fenzhong = minute + "";
    }
    var miao = "";
    if (second < 10) {
      miao = "0" + second;
    } else {
      miao = second + "";
    }
    var time = year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao
    return time
  },

  submit(e) {
    console.log(e);
    var loginId = wx.getStorageSync('loginId')
    var form = e.detail.value
    var count = this.data.count
    var res = this.data.res
    db.collection('comment').add({
      data: {
        ...form,
        loginId,
        ghserver:res.ghserver,
        ordermsg:res,
        count: this.data.active + 1,
        time: this.getNowDate(),
      }
    }).then(res => {
      console.log(res)
      var id = this.data.res._id
      db.collection('order').doc(id).update({
        data: {
          iscomment: true
        }
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: '评论成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: "1"
          })
        }, 1000);
      })

    })
  },

  click(e) {
    const {
      score,
      count
    } = this.data;
    const active = e.currentTarget.dataset.index;
    this.setData({
      active
    })
    this.triggerEvent("click", {
      result: score / count * active
    }, {})
  },

  onLoad(e) {
    var id = e.id
    db.collection('order').doc(id).get().then(res => {
      console.log(res)
      this.setData({
        res: res.data,
      })
    })
  },
  onShow() {

  }
})