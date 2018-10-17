//sort.js
//獲取應用實例
var app = getApp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户个人信息
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    }
  },
  /**
   *点击添加地址事件
   */
  add_address_fun: function () {
    wx.navigateTo({
      url: 'add_address/add_address',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
      var that = this;
      //1. 请求后端API生成小程序码
      //that.getQr();

      //2. canvas绘制文字和图片
      const ctx = wx.createCanvasContext('myCanvas');
    var imgPath = 'image/bg.jpg';
      var bgImgPath = 'image/bg.jpg';
    var basicprofile = 'image/bg.jpg';
    var xcxcode = "image/bg.jpg";

      //填充背景
      ctx.setFillStyle('#cccccc');
      ctx.fillRect(0, 0, 240, 360);
      ctx.setFillStyle('#ffffff');
      ctx.fillRect(1, 1, 238, 358);

      //绘制产品图
      ctx.drawImage(imgPath, 2, 2, 236, 200);

      //绘制标题
      ctx.setFontSize(16);
      ctx.setFillStyle('#000000');
      ctx.fillText('卓越中环', 10, 225);

      //绘制介绍产品
      ctx.setFontSize(12);
      ctx.setFillStyle('#6F6F6F');
      ctx.fillText('卓越中环，五星级住宿，还你一个安静的家', 10, 250);
      ctx.fillText('天宝地铁站a出口', 10, 270);

      //绘制一条虚线

      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      ctx.setLineWidth(1);
      ctx.setLineDash([2, 4]);
      ctx.moveTo(10, 285);
      ctx.lineTo(235, 285);
      ctx.stroke();

      //绘制矿业人图标
      ctx.drawImage(basicprofile, 10, 310, 30, 30);

      //绘制介绍
      ctx.setFontSize(11);
      ctx.setFillStyle('#aaaaaa');
      ctx.fillText('长按扫码查看详情', 47, 318);
      ctx.fillText('分享自安家直讯', 47, 338);
      ctx.drawImage(xcxcode, 165, 295, 60, 60);

      ctx.draw();

   

  },

  eventSave:function() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
})
