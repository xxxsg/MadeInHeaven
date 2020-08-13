// user-pages/change-user-info/change-user-info.js

var app = getApp();
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: null,
    nikeName: null,
    nikeIntro: null,
    filePath: null,
    headIsChanged: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      head: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/image/'+options.head,
      nikeName: options.name,
      nikeIntro: options.intro,
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

  },

  /**
   * 头像选择点击
   */
  headClick: function(){
    var that = this;
    wx.chooseImage({
      success: res => {
        that.setData({filePath: res.tempFilePaths[0], headIsChanged: true})
        
        
        that.setData({ head: res.tempFilePaths[0] })
      }
    })
  },

  /**
   * 窗口输入内容
   */
  nikeNameInput: function(res){
    this.setData({ nikeName: res.detail.value })
  },

  nikeIntroInput: function (res) {
    this.setData({ nikeIntro: res.detail.value })
  },

  /**
   * 提交头像点击
   */
  commitClick: function(){
    var that = this;
    //昵称为必填项目
    if(that.data.nikeName != 0){
      //更改头像
      if(that.data.headIsChanged){
        wx.uploadFile({
          url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/set-head',
          filePath: that.data.filePath,
          name: 'head',
          header: {
            "Content-Type": "multipart/form-data",
            'token': app.appData.token,
          },

          success: function(res){
            app.appData.token = res.header.token;
            that.setData({ headIsChanged: false, filePath: null })
          },
          fail: function(res){
            console.log("上传失败")
          }
        })
      }
      //更改信息
      wx.request({
        url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/change-user-info',
        data: {
          name: that.data.nikeName,
          intro: that.data.nikeIntro
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" , token: app.appData.token },
        method: 'POST',
        success: function (res) {
          app.appData.token = res.header.token;
          if (res.data == "suc") {
            //用户信息已更改
            app.appData.userPageChange = true;
            $Message({
              content: '提交成功',
              type: 'success'
            });
          } else if (res.data == "fail") {
            $Message({
              content: '提交失败',
              type: 'error'
            });
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      $Message({
        content: '请您填写昵称',
        type: 'warning'
      });
    }
  }
})