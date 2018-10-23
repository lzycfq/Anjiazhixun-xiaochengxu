var app = getApp()
Page({
  data: {
    boolean: false,
    flag1: true,
    flag2: true,
    flag3: true,
    flag4: true,
    bt:{},
    indicatorDots: false, autoplay: true, interval: 3000, duration: 1000,
    curr_id: '',   //当前打开的视频id
    swiperCurrent: 0,
    painting: {},
    shareImage: '',
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },

  
  },

  



  phone: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber,
    })
  },


  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent)
  },


 
  // 模态框
  // 图标模态框弹出
  show1: function () {

    this.setData({ flag1: false })

  },
  //图标模态框关闭
  hide1: function () {

    this.setData({ flag1: true })

  },
  // 图标模态框弹出
  show2: function () {

    this.setData({ flag2: false })

  },
  //图标模态框关闭
  hide2: function () {

    this.setData({ flag2: true })

  },
  // 图标模态框弹出
  show3: function () {

    this.setData({ flag3: false })

  },
  //图标模态框关闭
  hide3: function () {

    this.setData({ flag3: true })

  },
  // 图标模态框弹出
  show4: function () {

    this.setData({ flag4: false })

  },
  //图标模态框关闭
  hide4: function () {

    this.setData({ flag4: true })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 看房补贴表单提交
  yuyueSubmit: function (e) {
    var that = this;
    that.setData({
      showPage: true,
    })
  
    var telUser = e.detail.value.yuyuephone;
    console.log(telUser)
    if (!/1[3-9]\d{9}/.test(telUser)) {
      wx.showToast({
        title: '请输入正确手机号码',
        duration: 1000,
        icon: "none"
      })
      return;
    } else {
      wx.login({
        success: function (lgres) {
          wx.request({
            url: 'http://test.anjiazhixun.com/home/customer',
            method: 'POST',
            data: {  "telUser": telUser },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: '信息提交成功',
                duration: 1500,
                icon: "none"
              })
            },
            fail: function () {
              title: "信息提交失败"
            },
            complete: function () {
              that.setData({
                showPage: false,
              })
            }
          })
        }
      })

    }
  },
  // 看房补贴表单提交
  formKanfang: function (e) {
    var that = this;
    that.setData({
      showPage: true,
    })
    var nameUser = e.detail.value.kanfangname;
    var telUser = e.detail.value.kanfangphone;
    console.log(nameUser + telUser)
    if (!/1[3-9]\d{9}/.test(telUser)) {
      wx.showToast({
        title: '请输入正确手机号码',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (nameUser=="") {
      wx.showToast({
        title: '请输入您的姓名',
        duration: 1000,
        icon: "none"
      })
      return;
    } else {
      wx.login({
        success: function (lgres) {
          wx.request({
            url: 'http://test.anjiazhixun.com/home/customer',
            method: 'POST',
            data: { "nameUser": nameUser, "telUser": telUser},
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: '信息提交成功',
                duration: 1500,
                icon: "none"
              })
            },
            fail: function () {
              title: "信息提交失败"
            },
            complete: function () {
              that.setData({
                showPage: false,
              })
            }
          })
        }
      })

    }
  },

  // 留言咨询表单提交
  maifangzhushou: function (e) {
    var that = this;
    that.setData({
      showPage: true,
    })
    var maifangcontent = e.detail.value.maifangcontent;
    var telUser = e.detail.value.maifangzhushouphone;
    console.log(maifangcontent + telUser)
    if (!/1[3-9]\d{9}/.test(telUser)) {
      wx.showToast({
        title: '请正确输入您的手机号',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (maifangcontent="") {
      wx.showToast({
        title: '请正确输入您咨询内容',
        duration: 1000,
        icon: "none"
      })
      return;
    } else {
      wx.login({
        success: function (lgres) {
          wx.request({
            url: '',
            method: 'POST',
            data: { "maifangcontent": maifangcontent, "telUser": telUser },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: '信息提交成功',
                duration: 1500,
                icon: "none"
              })
            },
            fail: function () {
              title: "信息提交失败"
            },
            complete: function () {
              that.setData({
                showPage: false,
              })
            }
          })
        }
      })

    }
  },

  onReady: function () {  //创建视频上下文对象
    this.videoContext = wx.createVideoContext('myVideo')
  },
  videoPlay(e) {
    this.setData({
      curr_id: e.currentTarget.dataset.id,
    })
    this.videoContext.play()
  },

  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene);
    // var query = options.query.scene//123
    var that = this
    // 轮播请求数据
    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.103/json/lunbo.json',
      // url: 'http://www.anjiazhixun.com/json/lunbo.json',

      method: 'GET',
      data: {
       
      },
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log('55555' + res),
          that.setData({
            images: res.data
          })
      }
    })
    // 标题+文本
    var that = this

    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.103/json/biaoti.json',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log('2222' + res),
          that.setData({
          bt: res.data
          })
      }
    })

    

    // 广告
    var that = this
    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.103/json/wenlunbo.json',
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log(res),
          that.setData({
          guanggao:res.data
       
          })
      }
    })
    var that = this

    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.103/json/datashiping.json',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log(res),
          that.setData({
            items: res.data
          })
      }
    })


    // 楼盘文本+图片请求数据
    var that = this
    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.103/json/LP.json',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
    console.log(res)
    that.setData({
      loupan:res.data
    })

       
      }
    })
    // 查看户型
    var that = this
    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.103/json/huxing.json',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log('11111' + res),
          that.setData({
          anjiahuxing: res.data
          })
      }
    })
    // 按钮查看户型
    var that = this
    var sid = options.shopId;
    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.103/json/anniuhuxing.json',
      method: 'GET',
      data: {
        key: 'mallName',
        desc: 'descName',
        shopId: 'id'

      },
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log('11111' + res),
          that.setData({
          anniuhuxing: res.data
          })
      }
    })
    // 生成小程序码
    var thta = this;
    wx.request({
      url: '',
      method: "post",
      data: {
        page: "show/show",
        scene: "1234&123",
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'

      },
      success: function (res) {
      let qrcodeurl = res.data;
      that.setData({
      qrcodeurl:res.data       
      })
      }
    })
  },
     
// onReady:function(){
//     // 绘制canvas
//     var that = this;
//     //1. 请求后端API生成小程序码
//     //that.getQr();

//     //2. canvas绘制文字和图片
//     const ctx = wx.createCanvasContext('myCanvas');
//     var title = that.data.bt[0].biaotiname;
//     var desc_1 = that.data.loupanbt[0].loupanwenben;
//     var imgPath = that.data.loupanbt[1].images; //商品图标  
//     var basicprofile = '/image/LOGO-1.jpg'; //安家直讯logo
//   // var xcxcode = that.data.qrcodeurl; //小程序分享码
//     var xcxcode = 'image/bg.jpg'; //小程序分享码
//     //填充背景
//     ctx.setFillStyle('#cccccc');
//     ctx.fillRect(0, 0, 240, 360);
//     ctx.setFillStyle('#ffffff');
//     ctx.fillRect(1, 1, 238, 358);

//     //绘制产品图
//     ctx.drawImage(imgPath, 2, 2, 236, 200);

//     //绘制标题
//     ctx.setFontSize(16);
//     ctx.setFillStyle('#000000');
//     ctx.fillText(title, 10, 225);

//     //绘制介绍产品
//     ctx.setFontSize(12);
//     ctx.setFillStyle('#6F6F6F');
//     ctx.fillText(desc_1, 10, 250);
//     ctx.fillText('安家直讯，为你抢先挑好房！', 10, 270);

//     //绘制一条虚线

//     ctx.strokeStyle = 'blue';
//     ctx.beginPath();
//     ctx.setLineWidth(1);
//     ctx.setLineDash([2, 4]);
//     ctx.moveTo(10, 285);
//     ctx.lineTo(235, 285);
//     ctx.stroke();

//     //安家直讯图标
//     ctx.drawImage(basicprofile, 10, 310, 30, 30);

//     //绘制介绍
//     ctx.setFontSize(11);
//     ctx.setFillStyle('#aaaaaa');
//     ctx.fillText('长按扫码查看详情', 47, 318);
//     ctx.fillText('分享自安家直讯', 47, 338);
//     ctx.drawImage(xcxcode, 165, 295, 60, 60);

//     ctx.draw();



//   },

//   eventSave: function () {
//     wx.saveImageToPhotosAlbum({
//       filePath: this.data.shareImage,
//       success(res) {
//         wx.showToast({
//           title: '保存图片成功',
//           icon: 'success',
//           duration: 2000
//         })
//       }
//     })
// },


  onShareAppMessage: function (res) {
    console.log(this.data.bt[0].biaotiname)
 
    return {
      title: this.data.bt[0].biaotiname,
      path: '/pages/show/show?shopId=' + this.data.id,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },

 
})
