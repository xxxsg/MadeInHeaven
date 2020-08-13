// user-pages/change-password/change-password.js

var app = getApp();
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordVisiable: false,
    passwordVisiable1: false,
    passwordVisiable2: false,
    passwordOld: null,
    passwordNew: null,
    passwordAgain: null
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
   * 显示密码
   */
  passwordVisiableClick: function(){
    var temp = this.data.passwordVisiable;
    this.setData({ passwordVisiable: !temp})
  },
  passwordVisiableClick1: function () {
    var temp = this.data.passwordVisiable1;
    this.setData({ passwordVisiable1: !temp })
  },
  passwordVisiableClick2: function () {
    var temp = this.data.passwordVisiable2;
    this.setData({ passwordVisiable2: !temp })
  },

  /**
   * 输入框
   */
  oldPasswordInput: function (e){
    this.setData({ passwordOld: e.detail.value})
  },
  newPasswordInput: function (e) {
    this.setData({ passwordNew: e.detail.value })
  }, 
  againPasswordInput: function (e) {
    this.setData({ passwordAgain: e.detail.value })
  },

  /**
   * 请求
   */
  commitClick:function(){
    //判断是否一样
    var that = this;
    if(this.data.passwordNew != this.data.passwordAgain){
      $Message({
        content: '新密码输入不一致',
        type: 'error'
      });
    }else{
      wx.request({
        url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/change-password',
        data: {
          'password-old': that.data.passwordOld,
          'password-new': that.data.passwordNew,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'token': app.appData.token,
        },
        method: 'POST',
        success: function (res) {
          app.appData.token = res.header.token;
          if(res.data == "suc"){
            $Message({
              content: '密码已更改，下次登录生效',
              type: 'success'
            });
          }else if(res.data == "fail"){
            $Message({
              content: '原密码错误',
              type: 'error'
            });
          }
        },
        fail: function (res) { console.log("更改密码请求失败") },
        complete: function (res) { },
      })
    }
  }
})