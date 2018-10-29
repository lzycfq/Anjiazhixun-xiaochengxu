
var page=0;
Page({
  data: {
    tabTxt: ['品牌', '价格', '销量'],//分类
    tab: [true, true, true],
    // pinpaiList: [{ 'id': '1', 'title': '万科' }, { 'id': '1', 'title': '碧桂园' }],
    pinpai_id: 0,//品牌
    pinpai_txt: '',
    jiage_id: 0,//价格
    jiage_txt: '',
    xiaoliang_id: 0,//销量
    xiaoliang_txt: '',
    articles:[],
    pageNumber:1,
    pageSize:5
  },

  //默认加载数据
  onLoad: function (options) {
    this.clearCache();//清本页缓存
    this.getArticles(0);//第一次加载数据
  },
  // 下拉刷新加载更多
  onPullDownRefresh: function () {
    this.clearCache();
    this.getArticles(0);//第一次加载数据
  },

  // 页面上拉触底事件（上拉加载更多）
  onReachBottom: function () {
    this.getArticles(page);//后台获取新数据并追加渲染
  },

  // 清缓存
  clearCache: function () {
    page = 0;//分页标识归零
    this.setData({
      articles: [] //文章列表数组清空
    });
  },

  getArticles: function (pg) {
    //设置默认值
    pg = pg ? pg : 0;
    var that = this;
    var apiUrl = 'http://192.168.1.101/json/shuju.json';//文章列表接口地址
    var postData = {
      page: pg,//分页标识
      app_version: 1.2,//当前版本，后台根据版本不同给出不同的数据格式
    }
    wx.request({
      url: apiUrl,
      data: postData,
      method: 'get',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res)
        
          that.setData({
            articles: res.data
          })    
      },
      fail: function (e) {
        console.log(e);
      }
    })
  },

  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function (e) {
    var self = this,
    id = e.currentTarget.dataset.id,
    txt = e.currentTarget.dataset.txt,
    tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          pinpai_id: id,
          pinpai_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          jiage_id: id,
          jiage_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          xiaoliang_id: id,
          xiaoliang_txt: txt
        });
        break;
    }
    //数据筛选
    self.getDataList();
  },

  //点击加载数据
  getDataList: function (e) {
    //调用数据接口，获取数据
    var that = this;
    var pinpai=that.data.pinpai_txt;   
    var jiage = that.data.jiage_txt;    
    var xiaoliang = that.data.xiaoliang_txt;
    wx.request({
      url: 'http://192.168.1.101/json/shuju.json',
      method: 'post',
      data: {
        pinpai: that.data.pinpai_txt,
        jiage: that.data.jiage_txt,
        xiaoliang: that.data.xiaoliang_txt,
      },
      
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
     
        console.log(that.data.jiage_txt || that.data.pinpai_txt || that.data.xiaoliang_txt);
        that.setData({
          articles: res.data
          
        })

      }

    })  
  },

})
