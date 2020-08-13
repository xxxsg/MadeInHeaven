// user-pages/user-records/user-records.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRecordes: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/get-user-records',
      header: {token : app.appData.token},
      dataType: 'json',
      responseType: 'text',
      success: function (res) { 
        app.appData.token = res.header.token;
        //按时间排序
        res.data.sort(function (a, b) {
          return a.time < b.time ? 1 : -1; 
        })
        that.setData({ userRecordes: res.data });
      },
      fail: function(res) {},
      complete: function(res) {},
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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

  }
})