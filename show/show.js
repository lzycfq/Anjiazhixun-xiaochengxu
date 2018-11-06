var app = getApp()
Page({
  data: {
    boolean: false,
    flag1: true,
    flag2: true,
    flag3: true,
    flag4: true,
    bt: {},
    indicatorDots: false, autoplay: true, interval: 3000, duration: 1000,
    curr_id: '',   //当前打开的视频id
    swiperCurrent: 0,
    painting: {},
    shareImage: '',
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    maskHidden: false,
    current: 0,
    swiper: [],
  },





  phone: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber,
    })
  },
  // //查看户型（1）轮播点击切换

  prevImg: function () {
    if (this.data.current == 0) return
    this.setData({
      current: --this.data.current,
    })
  },

  nextImg: function () {
    if (this.data.current == this.data.swiper.length -1)
     return
    this.setData({
      current: ++this.data.current,
    })
  },
  // //查看户型（2）轮播点击切换

  prevImghx: function () {
    if (this.data.current == 0) return
    this.setData({
      current: --this.data.current,
    })
  },

  nextImghx: function () {
    if (this.data.current == this.data.swiper.length - 1) return
    this.setData({
      current: ++this.data.current,
    })
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
            data: { "telUser": telUser },
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
    } else if (nameUser == "") {
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
            data: { "nameUser": nameUser, "telUser": telUser },
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
    } else if (maifangcontent = "") {
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
      url: 'http://192.168.1.102/json/lunbo.json',
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
      url: 'http://192.168.1.102/json/biaoti.json',
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
      url: 'http://192.168.1.102/json/wenlunbo.json',
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log(res),
          that.setData({
            guanggao: res.data

          })
      }
    })
    //视频加载
    var that = this

    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.102/json/datashiping.json',
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
      url: 'http://192.168.1.102/json/LP.json',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log(res)
        that.setData({
          loupan: res.data
        })


      }
    })
    // 查看户型
    var that = this
    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.102/json/huxing.json',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log('11111' + res),
          that.setData({
            swiper: res.data
          })
      }
    })
    // 按钮查看户型
    //shopid为分享给我朋友连接后缀标识
    var that = this
    var sid = options.shopId;
    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.102/json/tedian.json',
      method: 'GET',
      data: {
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
    
  },


  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg:function () {
    var that = this;
    //2. canvas绘制文字和图片
    const  ctx = wx.createCanvasContext('mycanvas');
    var title = that.data.bt[0].biaotiname;//标题
    var desc_1 = that.data.loupan[0].loupanwenben;//文本介绍
    var imgPath = that.data.loupan[1].images; //商品图标  
    var basicprofile = '/image/LOGO-1.jpg'; //安家直讯logo
    // var xcxcode = that.data.qrcodeurl; //小程序分享码
    var xcxcode = '/image/bg.jpg'; //小程序分享码
    //填充背景
  
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(1, 1, 436, 527);

    //绘制产品图
    ctx.drawImage(imgPath, 2, 2, 436, 356);

    //绘制标题
    ctx.setFontSize(25);
    ctx.setFillStyle('#000000');
    ctx.fillText(title, 10, 395);

    //绘制介绍产品
    ctx.setFontSize(14);
    ctx.setFillStyle('#6F6F6F');
    ctx.fillText(desc_1, 10, 425);
    ctx.fillText('安家直讯，为你抢先挑好房！', 10, 445);

    //绘制一条虚线

    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.setLineWidth(1);
    ctx.setLineDash([2, 4]);
    ctx.moveTo(10, 465);
    ctx.lineTo(435, 465);
    ctx.stroke();

    //安家直讯图标
    ctx.drawImage(basicprofile, 10, 485, 30, 30);

    //绘制介绍
    ctx.setFontSize(13);
    ctx.setFillStyle('#aaaaaa');
    ctx.fillText('长按扫码查看详情', 47, 495);
    ctx.fillText('分享自安家直讯', 47, 515);
    ctx.drawImage(xcxcode, 165, 480, 60, 45);

    ctx.draw();

    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 1000);
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                maskHidden: true
              })
            }
          }, fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },
  //点击生成
  eventDraw: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '生成海报...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 1000)
  },

  

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
