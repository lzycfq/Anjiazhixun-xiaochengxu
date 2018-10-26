var app = getApp()
Page({
  data: {
    flag: true,
    flag2: true,
    flag3: true,
    flag4: true,
    currentCity:'',
    ajxtrue: false,
    
  },
// 电话拨打
  phone: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber,
    })
  },
  // 
  sousuoname:function(e){
    var that=this;
    that.setData({
      sousuoname:e.detail.value,
      hasUserInfo: true
    })
  },
 
  
// 图标模态框弹出
  show1: function () {

    this.setData({ flag: false })

  },
  //图标模态框关闭
  hide1: function () {

    this.setData({ flag: true })

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

  
  // 搜索表单提交
  formSousuo: function (e) {
    var that = this;
    that.setData({
      showPage: true,
    })

    var sousuoname = e.detail.value.sousuoname;
    console.log(sousuoname)
    if (sousuoname=="") {
      wx.showToast({
        title: '请输入搜索内容',
        duration: 1000,
        icon: "none"
      })
      return;
    } else {
      wx.login({
        success: function (lgres) {
          wx.request({
            url: 'http:192.168.1.103/json/shuju-1.json',
            method: 'POST',
            data: { sousuoname:e.detail.value.sousuoname },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: '信息提交成功',
                duration: 1500,
                icon: "none"
              })
              wx.navigateTo({
                url: "list/list"
              });
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
    if (nameUser == "") {
      wx.showToast({
        title: '请输入您的姓名',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (!/1[3-9]\d{9}/.test(telUser)) {
      wx.showToast({
        title: '请正确输入您的手机号',
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
            title:"信息提交失败"
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
   
  // 购房礼包表单提交
  goufanglibao: function (e) {
    var that = this;
    that.setData({
      showPage: true,
    })
  
    var telUser = e.detail.value.goufangphone;
    console.log(telUser)
    if (!/1[3-9]\d{9}/.test(telUser)) {
      wx.showToast({
        title: '请正确输入您的手机号',
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
            data: {"telUser": telUser },
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

  // 买房助手表单提交
  maifangzhushou: function (e) {
    var that = this;
    that.setData({
      showPage: true,
    })
    var maifangcontent = e.detail.value.maifangcontent;
    var telUser = e.detail.value.maifangzhushouphone;
    console.log(maifangcontent + telUser)
    if (maifangcontent == "") {
      wx.showToast({
        title: '请输入咨询内容',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (!/1[3-9]\d{9}/.test(telUser)) {
      wx.showToast({
        title: '请正确输入您的手机号',
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

  // 买房咨询表单提交
  maifangzixun: function (e) {
    var that = this;
    that.setData({
      showPage: true,
    })
    var maifangzixunphone = e.detail.value.maifangzixunphone;
    var city = e.detail.value.city;
    var loupan = e.detail.value.loupan;
    var sex = e.detail.value.sex;
    var fang = e.detail.value.fang;
    var price = e.detail.value.price;
    var cotunt = e.detail.value.cotunt;
    var jsfang = e.detail.value.jsfang;
    var other = e.detail.value.other;
    console.log(maifangzixunphone + city + loupan + sex+fang+price+cotunt+jsfang+other)
    if (!/1[3-9]\d{9}/.test(maifangzixunphone)) {
      wx.showToast({
        title: '请正确输入您的手机号',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (city=="") {
      wx.showToast({
          title: '请输入城市',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (loupan=="") {
      wx.showToast({
        title: '请输入楼盘名称',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (sex == "") {
      wx.showToast({
        title: '请输入楼盘类型',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (fang == "") {
      wx.showToast({
        title: '请输入多少户',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (price == "") {
      wx.showToast({
        title: '请输入价格m²',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (cotunt == "") {
      wx.showToast({
        title: '请输入总价',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (jsfang  == "") {
      wx.showToast({
        title: '请输入楼房特色',
        duration: 1000,
        icon: "none"
      })
      return;
    } else if (other == "") {
      wx.showToast({
        title: '还有啥内容想咨询？',
        duration: 1000,
        icon: "none"
      })
      return;
    }else {
      wx.login({
        success: function (lgres) {
          wx.request({
            url: '',
            method: 'POST',
            data: { "maifangzixunphone": maifangzixunphone, "city": city, "sex": sex, "fang": fang, "price": price, "cotunt": cotunt,"jsfang":jsfang,"other":other},
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


  onLoad: function (options) {
    this.getLocation();
    var that = this
    wx.request({
      url: 'http://192.168.1.103/json/data.json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
      
        that.setData({
          list: res.data,
         
        })

      }

    })
  //  特惠房源
    var that = this
    wx.request({
      url: 'http://192.168.1.103/json/tehui.json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          listtehui: res.data,
          //res代表success函数的事件对，data是固定的，list是数组
        })

      }

    })

  // 轮播请求
    var that = this
    //网络请求 GET方法
    wx.request({
      url: 'http://192.168.1.103/json/lunbo.json',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      //成功后的回调
      success: function (res) {
        console.log('11111' + res),
          that.setData({
            images: res.data
          })
      }
    })
  },



   getLocation: function () {
    var page = this   
     wx.getLocation({ type: 'wgs84',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标     
      success: function (res) {     
           // success        
             var longitude = res.longitude    
                 var latitude = res.latitude     
                    page.loadCity(longitude, latitude)  
                        }   
                         }) 
                          },  
                          loadCity: function (longitude, latitude) { 
                               var page = this 
                                  wx.request({    
                                    url: 'https://api.map.baidu.com/geocoder/v2/?ak=Bx2grqx47xKRXZaY3eIG480LiZijDH10&location=' + latitude + ',' + longitude + '&output=json',   
                                         data: {}, 
                                        header: {   
                                               'Content-Type': 'application/json'     
                                                },                                                                                              success: function (res) {   
                                           // success     
                                                 console.log(res);  
                                        var city =res.data.result.addressComponent.city;    
                                           page.setData({ currentCity: city 
                                           });  
                                               },    
                                                 fail: function () {    
                                                       page.setData({ currentCity: "获取定位失败" });  
                                                           },  
                                                  })  
                                       },
// 分享
  onShareAppMessage: function () {
    return {
      title: '安家直讯',
      path: 'index/index',
      desc:'安家直讯，抢先挑好房',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      }
    }
  },

  

})  



