const db=wx.cloud.database()
Page({
    data:{
        List:{}
    }
    ,
    onLoad(){
        wx.showLoading({ 
          title: '正在加载',
        })
        db.collection('ysmsg').get().then(res=>{
            console.log('请求成功',res)
            this.setData({
                List:res.data
            })
            
            wx.hideLoading()
        })
    }
})