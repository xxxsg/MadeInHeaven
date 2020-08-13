// pages/store-info/store-info.js

var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeInfo: null,
    goodsList: null,
    storeRule: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /** 店铺的info从index页面传过来 */
    var that = this;  
    this.setData({storeInfo: options})
    /** 请求商品列表 */
    wx.request({
      url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/get-goods-list?id='+that.data.storeInfo.id,
      method: 'GET',
      success: function(res){
        that.setData({ goodsList: res.data})
        console.log("商品列表",that.data.goodsList)
      },
      fail: function(res){
        console.log("商品列表 request fail")
      },
      complete: function(){ }
    })
    /** 商品规则 */
    wx.request({
      url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/get-store-rule?store-id=' + that.data.storeInfo.id,
      method: 'GET',
      success: function (res) {
        var flag = false;
        /** 处理json里面的json */
        for (var i = 0; i < res.data.length; i++){
          try{
            var temp = res.data[i].param;
            res.data[i].param = JSON.parse(temp);
            flag = true;
          }
          catch(e){
            console.log("not a json")
          }
        }
        if(flag){
          that.setData({ storeRule: res.data })
        }
        else{
          that.setData({ storeRule: null })
        }
      },
      fail: function (res) {
        console.log("商家规则 request fail")
      },
      complete: function () { }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("store info onhide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("store info unload")
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
  
})