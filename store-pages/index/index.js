//store-pages/index/index.js
//JSON.stringify(data);
//JSON.parse(res.data)

//获取应用实例
var app = getApp()
const { $Message } = require('../../dist/base/index');

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    storeInfo: null,  //储存店铺简要信息--其类型是一个json的列表
    swiperIndex: 0, //设置激活页面
    recommendInfo: null
  },

  /**
   * 生命周期函数--监听页面加载--加载商家列表
   */
  onLoad: function (options) {
    var that = this;
    /*请求商家列表*/
    wx.request({
      url:'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/get-store-list',
      method: 'GET',
      success: function (res) {
        that.setData({storeInfo: res.data})
        //推荐
        var temp = res.data.slice(0, res.data.length)
        var recommend = temp.sort(() => Math.floor(Math.random() - 0.5)).slice(0, 3);
        that.setData({ recommendInfo: recommend })
      },
      fail: function (res) {
        console.log("商家列表 request failed")
      },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /** 交易账单取消与否 */
    if (app.appData.billDeal == "confirm"){
      app.appData.billDeal = null;
      $Message({
        content: '交易成功',
        type: 'success'
      });
    } else if (app.appData.billDeal == "cancle"){
      app.appData.billDeal = null;
      $Message({
        content: '交易取消',
        type: 'error'
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("--index Unload--")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 滚动条
   */
  changeSwiper(event) {
    this.setData({
      swiperIndex: event.detail.current
    })
  },

  /**
   * 单击店铺进入店铺详情页
   */
  storeClick: function(event) {
    var storeInfo = this.data.storeInfo[event.currentTarget.dataset.index];
    wx.navigateTo({
      url: '../store-info/store-info?id=' + storeInfo.id + '&head=' + storeInfo.head + '&name=' + storeInfo.name + '&addr=' + storeInfo.addr + '&intro=' + storeInfo.intro + '&tag=' + storeInfo.tag,
    })
  },

  /**
   * 点击推荐页面进入详情页面
   */
  recommendInfoClick: function(event) {
    var recommendInfo = this.data.recommendInfo[event.currentTarget.dataset.index];
    wx.navigateTo({
      url: '../store-info/store-info?id=' + recommendInfo.id + '&head=' + recommendInfo.head + '&name=' + recommendInfo.name + '&addr=' + recommendInfo.addr + '&intro=' + recommendInfo.intro + '&tag=' + recommendInfo.tag,
    })
  },

  /**
   * 融聚邻里标识
   */
  rjll:function(){
    console.log("彩蛋")
  }
})