//user.js

var app = getApp();
const { $Message } = require('../../dist/base/index');
const { $Toast } = require('../../dist/base/index');
const QRCode = require('../../utils/weapp-qrcode.js')
import rpx2px from '../../utils/rpx2px.js'
let qrcode;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userIdNow: null,
    userInfo: null,
    modalVisible: false,
    levelRule: null,
    sheetVisible: false,
  },

  /**
   * 生命周期函数--监听页面加载--如果
   */
  onLoad: function (options) {
    if(app.appData.userIsLogin == null){
      wx.navigateTo({
        url: '../login/login',
      })
    }
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
    /** 如果app显示用户已经登陆，而且但是本页面并没有用户信息 */
    var that = this;
    /**用户信息发生变化的信号进行处理，分别有登陆 切换 退出 */
    if (app.appData.userPageChange || app.appData.userPageLoginChange){
      wx.request({
        url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/get-user-info',
        data: '',
        header: {token: app.appData.token},
        method: 'GET',
        success: function(res) {
          app.appData.token = res.header.token;
          that.setData({ userInfo: res.data, userIdNow: app.appData.userIsLogin })
          /**请求成功以后 页面改变函数改为false */
          if (app.appData.userPageLoginChange) {
            app.appData.userPageLoginChange = false;
            $Message({
              content: '登陆成功',
              type: 'success'
            });
          } else if (app.appData.userPageChange) {
            app.appData.userPageChange = false;
            $Message({
              content: '用户信息已修改',
              type: 'success'
            });
          }
          /** 登陆成功以后如果有连接了socket先关闭 */
          app.closeSocket()
          /** 登陆成功以后连接socket */
          app.webSocket();
        },
        fail: function(res) {
          console.log("个人信息 request faile")
        },
        complete: function(res) {},
      })
    } else if(app.appData.userPageExit){//
      /**
       * 用户已经退出的信号
       * 一共改四+1个地方
       * 将app.appData.userIsLoingin设置为false，token置空
       * 同时将本页面的userInfo ，userIdNow置空+1:socket关闭 
      */
      var that = this;
      app.appData.userIsLogin = null;
      app.appData.token = null;
      this.setData({ userInfo: null, userIdNow: null });
      //关闭socket
      app.closeSocket();
      app.appData.userPageExit = false;
      $Message({
        content: '您已退出登陆',
        type: 'warning'
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
   * 用户等级点击，展示升级规则
   */
  levelClick: function() {
    if (app.appData.userIsLogin == null) {
      $Toast({
        content: '请您登陆',
        type: 'warning'
      });
      return;
    }
    var that = this;
    //显示积分详情对话框
    wx.request({
      url: 'https://madeinheavon-repo-madeinheaven.app.secoder.net/api/wechat/get-level-rules',
      header: {
        token: app.appData.token
      },
      method: 'GET',
      success: function (res) {
        app.appData.token = res.header.token;
        res.data.param = JSON.parse(res.data.param)
        that.setData({ levelRule: res.data });
        that.setData({ modalVisible: true });
      },
      fail: function (res) { console.log("详情出错",app.appData.token)},
      complete: function (res) { },
    })
  },

  /** 
   * 消费记录查询
   */
  recordClick: function(){
    if (app.appData.userIsLogin == null) {
      $Toast({
        content: '请您登陆',
        type: 'warning'
      });
      return;
    }
    wx.navigateTo({
      url: '../user-records/user-records',
    })
  },

  /**
   * 登陆或者切换用户的按钮，点击跳到登陆界面
   */
  loginButtonClick: function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },

  /**
   * 退出按钮，单机以后退出登陆，
   */
  exitButtonClick:function(){
    if (app.appData.userIsLogin == null) {
      $Toast({
        content: '请您登陆',
        type: 'warning'
      });
      return;
    }
    app.appData.userPageExit = true;
    this.onShow();
  },

  /**
   * 修改用户的点击
   */
  changeUserInfo: function(){
    if (app.appData.userIsLogin == null) {
      $Toast({
        content: '请您登陆',
        type: 'warning'
      });
      return;
    }
    var that = this;
      //跳转更改信息页面
    wx.navigateTo({
      url: '../change-user-info/change-user-info?head=' + that.data.userInfo.head + '&name=' + that.data.userInfo.name + '&intro=' + that.data.userInfo.intro,
    })
  },

  /**
   * 展示弹窗
   */
  handleClose() {
    this.setData({
      modalVisible: false
    });
  },

  /**
   * 单机更改密码
   */
  changePassword: function(){
    if (app.appData.userIsLogin == null) {
      $Toast({
        content: '请您登陆',
        type: 'warning'
      });
      return;
    }
    wx.navigateTo({
      url: '../change-password/change-password',
    })
  },

  /**
   * 单机显示用户二维码
   */
  showUserId: function(){
    if (app.appData.userIsLogin == null){
      $Toast({
        content: '请您登陆',
        type: 'warning'
      });
      return;
    }
    this.setData({sheetVisible: true})
    var that = this;
    qrcode = new QRCode('canvas', {
      text: that.data.userIdNow,
      width: 150,
      height: 150,
      colorDark: "#495060",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },

  handleCancel:function(){
    this.setData({ sheetVisible: false })
  }
})