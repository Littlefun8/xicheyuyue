Page({
    data: {
        date: '',
        server: '',
        type: '',
        maxNum: 9,
        radio: '1',
        remain1:0,
        remain2:0,
        remain3:0,
        remain4:0,
        remain5:0,
        remain6:0
    },
 

    onClick(event) {
        console.log(event)
        const {
            name
        } = event.currentTarget.dataset;
        
        this.setData({
            radio: name,
        });
    },
    onLoad(e) {
        //还是要拿id去获取一下工作人员的信息。
        console.log(e)
        var date = e.date 
        var server = e.doctor
        var type = e.keshi
        var maxNum = e.maxNum
        var docid = e.docid
        wx.cloud.callFunction({
            name:"getserverbyid",
            data:{
                id:docid
            }
        }).then(res=>{ 
            console.log(res)
            this.setData({
                serverinfo:res.result.data
            })
        })
        this.setData({
            
            date: date,
            server: server,
            type: type,
            maxNum: maxNum,
            docid:docid
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"1",
                server:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain1:res.result.data.length
            })
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"2",
                server:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain2:res.result.data.length
            })
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"3",
                server:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain3:res.result.data.length
            })
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"4",
                server:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain4:res.result.data.length
            })
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"5",
                server:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain5:res.result.data.length
            })
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"6",
                server:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain6:res.result.data.length
            })
        })
    },
    verify(timenum){
        if (timenum=='1') {
            if (this.data.remain1==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }if (timenum=='2') {
            if (this.data.remain2==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }if (timenum=='3') {
            if (this.data.remain3==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }if (timenum=='4') {
            if (this.data.remain4==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }if (timenum=='5') {
            if (this.data.remain5==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }if (timenum=='6') {
            if (this.data.remain6==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }
        return true
    },
    book(){
        //预约开始
        //一，验证一下是不是有足够多的剩余位
        var timenum=this.data.radio
       var isfull= this.verify(timenum)
       if (!isfull) {
           wx.showToast({
             title: '该时间段不可约，请重新选择！',
             icon:"none"
           })
           return
       }
        wx.showLoading({
          title: '正在操作',
        })
        const db=wx.cloud.database()
        db.collection('order').add({
            data:{
                ghserver:this.data.docid,
                ghuser:wx.getStorageSync('loginmsg')._id,
                timenum:this.data.radio,
                bookdate:this.data.date,
                type:this.data.type,
                typeid:this.data.serverinfo.type,
                ghservername:this.data.server,
                ispay:false,
                price:this.data.serverinfo.price
            } 
        }).then(res=>{
            wx.hideLoading()
            console.log(res)
            wx.showToast({
              title: '操作成功',
              icon:"none"
            })
            // 完成了就跳转到支付呗
            var newid=res._id
            wx.navigateTo({
              url: '../topay/topay?id='+newid,
            })
        })
    }
})