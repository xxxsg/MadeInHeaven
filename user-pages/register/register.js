var app = getApp();
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordVisiable: false,
    passwordVisiable1: false,
    id: null,
    name: null,
    password: null,
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
  passwordVisiableClick: function () {
    var temp = this.data.passwordVisiable;
    this.setData({ passwordVisiable: !temp })
  },
  passwordVisiableClick1: function () {
    var temp = this.data.passwordVisiable1;
    this.setData({ passwordVisiable1: !temp })
  },

  /**
   * 输入框
   */
  idInput: function (e) {
    this.setData({ id: e.detail.value })
  },
  nameInput: function (e) {
    this.setData({ name: e.detail.value })
  },
  passwordInput: function (e) {
    this.setData({ password: e.detail.value })
  },
  againPasswordInput: function (e) {
    this.setData({ passwordAgain: e.detail.value })
  },

  /**
   * 请求
   */
  commitClick: function () {
    //判断是否一样
    var that = this;
    if (this.data.password != this.data.passwordAgain) {
      $Message({
        content: '新密码输入不一致',
        type: 'error'
      });
    } else {
      wx.request({
        url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/register',
        data: {
          'id': that.data.id,
          'name': that.data.name,
          'pw': that.data.password,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: 'POST',
        success: function (res) {
          if (res.data == "suc") {
            $Message({
              content: '注册成功',
              type: 'success'
            });
          } else if (res.data == "idc") {
            $Message({
              content: '用户已存在',
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