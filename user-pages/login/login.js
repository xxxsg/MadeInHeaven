/** pages/pages/login.js */

var app = getApp();
const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginName: null,
    loginPassword: null,
    passwordVisiable: false
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

  /** 用户注册 */
  registerClick: function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },

  /**
   * 登陆按钮按下
   */
  loginButtonClick: function(){
    var that = this;
    /** 登陆请求 */
    wx.request({
      url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/login',
      data:{
        'id': that.data.loginName,
        'pw': that.data.loginPassword
      },
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      method: 'POST',
      success: function(res) {
        if(res.data == "suc"){
          $Message({
            content: '登陆成功',
            type: 'success'
          });
          app.appData.userIsLogin = that.data.loginName;
          //用户信息已更改
          app.appData.userPageLoginChange = true;
          app.appData.token = res.header.token;
          that.setData({ erroInfo: '' })
          console.log("登陆成功")
          wx.navigateBack({ })
        }else if(res.data == "fail"){
          $Message({
            content: '密码错误',
            type: 'error'
          });
          console.log("登陆失败")
        }
      },
      fail: function(res) {
        console.log("登陆请求 request failed")
      },
      complete: function(res) {},
    })
  },

  /** 
   * 获取用户名输入内容
   */
  loginNameInput: function(event){
    var that = this;
    this.setData({loginName: event.detail.value})
  },

  /**
   * 获取密码输入内容
   */
  loginPasswordInput: function(event){
    var that = this;
    this.setData({loginPassword: event.detail.value})
  },

  passwordVisiableClick: function (event) {
    var temp = this.data.passwordVisiable;
    this.setData({ passwordVisiable: !temp })
  },
})