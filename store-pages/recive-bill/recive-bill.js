// store-pages/recive-bill/recive-bill.js


var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalVisible: false,
    bill:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({bill: app.appData.bill})
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

  },

  /**
   * 点击确认按钮，显示确认框
   */
  cofirmClick: function(){
    this.setData({ modalVisible: true });
  },

  /**
   * 点击确认，发送确认信息
   */
  handleClose: function(res){
    if (res.type == 'ok'){
      /** 发送确认信息，以及让主页显示交易成功 */
      app.sendMessage("confirm", this.data.bill.id)
      app.appData.userPageChange = true;//信息更改
      app.appData.billDeal = "confirm";
      wx.switchTab({
          url: '../index/index',
      })
    } else if (res.type == 'cancel'){
      /** 发送取消信息，以及让主页显示交易取消 */
      app.appData.billDeal = "cancel";
      app.sendMessage("cancel", this.data.bill.id)
      wx.switchTab({
        url: '../index/index',
      })
    }
    this.setData({ modalVisible: false });//隐藏窗口
    //清空账单
    app.appData.bill = null;
    this.setData({ bill: null})

  }
})