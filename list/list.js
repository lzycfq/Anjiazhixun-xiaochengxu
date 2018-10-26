
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
// onLoad:function(){
//   var that=this
//   that.loadarticles();
// },
// loadarticles:function(res){
// var that=this
// //获取分页信息
//   var pageNumber = that.data.pageNumber;
//   var pageSize = that.data.pageSize;
//   wx:wx.request({
//     url: 'http://192.168.1.104/json/shuju.json',
//     data:{
//       "pageNumber": pageNumber,"pageSize": pageSize
//     },
//     header: {
//       'content-type': 'application/json'
//     },
//     method: 'GET',
//     success: function(res) {
//       console.log(res)
//       if(res.resultCode==200){
//     var articles = that.data.articles
//     var reqarticles = res.resarticles
//     if (reqarticles.length==0){
//         wx.showToast({
//           title: '没有更多数据',
//           duration:1000
//         });
//       //分页失败
//       if(pageNumber>1){
//         that.setData({
//           pageNumber:--pageNumber
//         });
//       }
//       return
//     }
//     that.setData({
//       articles: articles.concat(reqarticles)
//     });
//   }else{
//     wx:wx.showToast({
//       title: '加载数据失败',
//       duration: 1000,
//     });
//     if(pageNumber> 1){
//     that.setData({
//     pageNumber: --pageNumber
//   });
// }
//   }
//   console.log(res)
    
//     }
//   })
// },
// //下拉刷新
//   onPullDownRefresh: function () {
//     var that = this;
//     //下拉刷新，将pageNumber和pageSize分别设置成1和5，并初始化数据，让数据重新通过loadRoom()获取
//     that.setData({
//       pageNumber: 1,
//       pageSize: 5,
//       articles: []
//     })
//     that.loadRooms();
//     wx.stopPullDownRefresh();
//   },


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
    var apiUrl = 'http://192.168.1.104/json/shuju.json';//文章列表接口地址
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
      url: 'http://192.168.1.104/json/shuju.json',
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
